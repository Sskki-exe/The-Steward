const creds = require("./sheetCredentials.json");
const gmail = require("./gmail.js")
const sheetID = "1bP6QySg05_XrJQDTfk4Pjp73aL-a-Jm_f31YEw2df8c";

// Import Google Sheets API
const {
    GoogleSpreadsheet
} = require('google-spreadsheet');

var emailOptions = {
    numbers: {}
};

// Encrypt string to 12 digit hexadecimal
function encrypt(input) {
    L = input.length;
    if (L > 12) {
        input = input.substring(L - 13, L - 1);
    }
    if (L < 12) {
        input = input + input.charAt(0).repeat(12 - L);
    }
    return Buffer.from(input).toString('base64');
}

// print function title
function title(str, m) {
    m.channel.send(str);
    var tempStr = "\n " + str + "\n";
    for (var i = 0; i < str.length + 2; i++) {
        tempStr += "=";
    }
    console.log(tempStr);
};

function getCell(sheet, coords) {
    return sheet.getCellByA1(coords).formattedValue;
}

// Get sheet by title
async function init(t, row = false, dimensions) {
    const doc = new GoogleSpreadsheet(sheetID);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    console.log(`Getting Sheet [${t}]... Success!`);
    const sheet = doc.sheetsByTitle[t];
    if (row) {
        return sheet.getRows();
    } else {
        await sheet.loadCells(dimensions);
        return sheet;
    }
}

async function email(m) {
    console.log("   _____                _ _\n  |  ___|              (_) |\n  | |__ _ __ ___   __ _ _| |\n  |  __| '_ ` _ \\ / _` | | |\n  | |__| | | | | | (_| | | |\n  \\____/_| |_| |_|\\__,_|_|_|");
    title("Importing Numbers for Email", m);
    const cells = await init("Summary", false, 'A15:I23');
    emailOptions.numbers = {
        backers: getCell(cells, 'I15'),
        money: getCell(cells, 'A15'),
        cars: getCell(cells, 'B20'),
        engines: getCell(cells, 'B21'),
        posters: (parseInt(getCell(cells, 'B22')) + parseInt(getCell(cells, 'B23'))).toString()
    };
    console.log(emailOptions.numbers);
    // Create Verification Codes & Sending Emails
    title("Generating Codes & Sending Emails", m);
    const rows = await init("BackerList", true);
    i = 0;
    while (true) {
        // Get row
        var row = rows[i];
        // Only get rows with names
        try {
            row.Name;
        } catch {
            break
        }
        if (row.Name == undefined || row.Name == '') {
            break
        }
        // If verification code undefined, encrypt name to generate one
        if (row["Verification Code"] == undefined || row["Verification Code"] == '') {
            var h = encrypt(row.Name);
            console.log(`${i+1}. "${row.Name}": "${h}"`);
            row["Verification Code"] = h;
            await row.save();
        } else {
            console.log(`${i+1}. "${row.Name}"`);
        }
        // If email undefined
        if (row.Email == "") {
            console.log("    No Email!");
        } else {
            console.log(`    Email: ${row.Email}`);
            // If email sent, skip
            if (row["Email Sent?"] == "TRUE") {
                console.log("    Email already sent!")
            } else {
                emailOptions.name = row.Name;
                emailOptions.email = row.Email;
                emailOptions.vCode = row["Verification Code"];
                await gmail.sendMail(emailOptions);
                console.log("    Email sent!");
                row["Email Sent?"] = true;
                await row.save();
            }
        }
        i++;
    }
    console.log("Complete!");
    m.channel.send("Complete!");
}

async function verify(m) {
    console.log("   _   _           _  __\n  | | | |         (_)/ _|\n  | | | | ___ _ __ _| |_ _   _\n  | | | |/ _ \\ '__| |  _| | | |\n  \\ \\_/ /  __/ |  | | | | |_| |\n   \\___/ \\___|_|  |_|_|  \\__, |\n                          __/ |\n                         |___/");
    title("Collecting Messages", m);
    var testCodes;
    var limit = 0;
    var verifyCount = 0;
    await m.channel.messages.fetch(100)
        .then(messages => {
            limit = messages.size;
            console.log(`Received ${messages.size} messages`);
            // Convert map to array, use map to reformat
            testCodes = Object.fromEntries([...messages].map(arr => {
                let id = arr[1].author.id;
                let content = arr[1].content;
                //ignore if Steward
                if (id == 'Steward') {
                    return
                }
                return [content, id]
            }).filter(function (e) {
                return e != null;
            }));
        });
    await m.channel.bulkDelete(limit + 1)
        .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
        .catch(console.error);
    m.channel.send(["Verifying...","Collecting Messages"]);
    console.log(testCodes);
    const tCodes = Object.keys(testCodes);
    // Verify Backers
    title("Comparing Messages to VCode List", m);
    const rows = await init("BackerList", true);
    i = 0;
    while (true) {
        // Get row
        var row = rows[i];
        // Only get rows with verification codes
        let vCode;
        try {
            vCode = row["Verification Code"];
        } catch {
            break
        }
        if (!vCode) {
            break;
        }
        // If verification code matched
        if (tCodes.includes(vCode)) {
            // Add Discord ID to spreadsheet
            let id = testCodes[vCode].toString();
            console.log(`    Found! ${row.Name}: "${id}"`);
            row["Discord ID"] = id;
            await row.save();
            // Give appropriate role to user
            try {
                row["Reward Tier"];
            } catch {
                console.log("    Reward Tier not found!")
                break
            }
            let roleName;
            switch (row["Reward Tier"]) {
                case "The Engine":
                case "The Graph Car":
                case "The Merchant Car":
                    roleName = "Passenger";
                    console.log("    Role: Passenger");
                    break
                case "Become the Conductor":
                    roleName = "Conductor";
                    console.log("    Role: Conductor");
                    break
                case "Become a Denizen":
                    roleName = "Denizen";
                    console.log("    Role: Denizen");
                    break
            }
            if (!roleName) {
                console.log("    No role given!");
                break
            }
            const {
                guild
            } = m;
            const role = guild.roles.cache.find((role) => {
                return role.name === roleName
            });
            const member = guild.members.cache.get(id);
            member.roles.add(role);
            console.log("    Role given!");
            verifyCount++;
        }
        i++;
    }
    let msg = `${verifyCount} user(s) have been verified at ${new Date().toLocaleString()}!`;
    console.log(msg);
    m.channel.send(msg);
    m.channel.send("Complete!");
}

module.exports = {
    email,
    verify
};