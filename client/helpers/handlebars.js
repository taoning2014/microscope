Template.registerHelper('pluralize', function(n, thing) {
  // fairly stupid pluralizer
  if (n === 1) {
    return '1 ' + thing;
  } else if (n < 0){
    return 0 + ' ' + thing;
  } else {
    return n + ' ' + thing + 's';
  }
});

Template.registerHelper('pluralizeArray', function(array, thing) {
  var n = array.length;
  // fairly stupid pluralizer
  if (n === 1) {
    return '1 ' + thing;
  } else if (n < 0){
    return 0 + ' ' + thing;
  } else {
    return n + ' ' + thing + 's';
  }
});