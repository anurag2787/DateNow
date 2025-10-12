// This is a script

let isDating = false;
const date = (user) => {
  isDating = true;
  return true;
}

const unDate = (user) => {
  isDating = false;
  return false;
}
if (isDating){
  unDate("test")
}
else{
  date("test")
}
