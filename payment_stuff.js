function clearDebt() {
  // reading
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();

  const empty = [Array(5).fill('')]

  const paid_from = String(data[0][7])
  const paid_to = String(data[0][9])

  // check for names
  if (paid_from === ""|| paid_to === ""){
    Logger.log("Missing arguments")
    return;
  }

  Logger.log(paid_from + " has paid " + paid_to)
  
  var clear_rows = []

  // locating rows to clear
  for(let i = 1; i < data.length; i++){
    if (String(data[i][3]) === paid_to && String(data[i][4]) === paid_from){
      clear_rows.push(i)
    }
    if (String(data[i][4]) === paid_to && String(data[i][3]) === paid_from){
      clear_rows.push(i)
    }
  }
  Logger.log(clear_rows.length)

  // clear those rows
  for(let i = 0; i < clear_rows.length; i++){
    var row = clear_rows[i] + 1
    var range = 'Itemized!A' + row + ':E' + row
    var to_clear = sheet.getRange(range)
    to_clear.setValues(empty)
  }

  // sorts the sheet
  data = sheet.getDataRange().getValues();
  sheet.sort(1, true)
}