 $("ul").on("click","li",function(){
     $(this).toggleClass("completed");
 });

 $("ul").on("click","span.del" , function(event){
     $(this).parent().fadeOut(500,function(){
         $(this).remove();
     });
    event.stopPropagation();

 });


 $("input[type='text']").keypress(function(event){
     if(event.which===13){
         var todo= $(this).val();
         $(this).val("");
         //new li 
         $("ul").append("<li ><span class='del'><i class='fa fa-trash'></i></span><span class='date'>"+ date +"</span><br/><span class='text'>"+ todo +" </span></li>");
     }
 });

 $(".fa-plus").click(function(){
     $("input[type='text']").fadeToggle();
 });


 function SetDate(){
            var date = new Date();
            
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            
            if (month < 10) month = "0" + month;
            if (day < 10) day = "0" + day;
            
            var today = year + "-" + month + "-" + day;
            
            
            document.getElementById('myDate').value = today;
            return date;
            }


 var date=SetDate();  
 
 
//  Date.prototype.toFormattedString = function (f)
// {
//     var nm = this.getMonthName();
//     var nd = this.getDayName();
//     f = f.replace(/yyyy/g, this.getFullYear());
//     f = f.replace(/yy/g, String(this.getFullYear()).substr(2,2));
//     f = f.replace(/MMM/g, nm.substr(0,3).toUpperCase());
//     f = f.replace(/Mmm/g, nm.substr(0,3));
//     f = f.replace(/MM\*/g, nm.toUpperCase());
//     f = f.replace(/Mm\*/g, nm);
//     f = f.replace(/mm/g, String(this.getMonth()+1).padLeft('0',2));
//     f = f.replace(/DDD/g, nd.substr(0,3).toUpperCase());
//     f = f.replace(/Ddd/g, nd.substr(0,3));
//     f = f.replace(/DD\*/g, nd.toUpperCase());
//     f = f.replace(/Dd\*/g, nd);
//     f = f.replace(/dd/g, String(this.getDate()).padLeft('0',2));
//     f = f.replace(/d\*/g, this.getDate());
//     return f;
// };


 