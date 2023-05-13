
var timeoutIdSnackBar;
function showSnackbar(message){
    console.log(message);

    clearTimeout(timeoutIdSnackBar);

    // Get the snackbar DIV
    var snackbar = document.getElementById("snackbar");
    snackbar.innerHTML = message;

    // Add the "show" class to DIV
    snackbar.className = "snackbar-show";

    // After 3 seconds, remove the show class from DIV
    timeoutIdSnackBar = setTimeout(
        function(){ 
            snackbar.className = snackbar.className.replace("snackbar-show", ""); 
            timeoutIdSnackBar = 0;
        }, 3000);
}

