const data = [
    { group: 'A', name: 'SD' }, 
    { group: 'B', name: 'FI' }, 
    { group: 'A', name: 'MM' },
    { group: 'B', name: 'CO'}
  ];
  const unique = [...new Set(data.map(item => item.group))];
  console.log(unique);