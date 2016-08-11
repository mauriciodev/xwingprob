$( document ).ready(function() {
  function factorial(n) {
    var res=1;      
    for (i=2;i<n+1;i++){
      res*=i;
    }
    return res;
  }

  function pbinomial(k,n, p) {
    comb= factorial(n)/(factorial(n-k)*factorial(k));
    return comb*Math.pow(p,k)*Math.pow(1-p,n-k);
  }

  function calcProb() {
    var n=parseInt($("#textHit").val());
    //var n=$("#spinnerMiss").spinner("value")+k;
    
    var p=0.5;
    var title="Hits";
    var rollType=$("input[name=rollType]:checked").val();
    if ( rollType=="defense" ){ //changing dice type
    //if ($("#checkboxRollType").is(':checked')==true) {
      p=3/8;
      title="Evades";
      
    }       
    //applying modifiers
    if ($("#focusCheckbox").is(':checked')==true) {     
      p+=0.25;
    } 
    if (rollType=="attack") { //attack mods
      if ($("#targetLockCheckBox").is(':checked')==true) {
        p=1-(1-p)*(1-p);
      }
    } 
    
    if (rollType=="defense") { //defense mods
      if ($("#zuckussCheckbox").is(':checked')==true) {
        p=p*p;
      }
    }
    //$("#res2").text(pbinomial(k,n,p)*100+'%');    
    
    //limited rerolls are added as a higher number of rolls, but then are summed to the highest possible value
    
    var rerolls=0;
    if ($("#rerollsCheckbox").is(':checked')==true) {
      rerolls=parseInt($("#numberOfRerolls").val());
    }
    
    //computes probabilities        
    var res=calcProbArray(n+rerolls,p);
    for (var i=0; i<rerolls; i++) {
      var tmp=res.pop();
      res[n]+=tmp;
    }
    
    
    //creates output table
    $("#res2").empty();
    $("#res2").append("<table>");
    $("#res2").append("<tr><td>"+title+"</td><td>Probability</td></tr>");
    for (i in res) {
      $("#res2").append("<tr><td>"+i+"</td><td>"+res[i].toFixed(2)+"%</td></tr>");        
    }
    $("#res2").append("</table>");
  }

  function calcProbArray(n,p) {
    var res=[];
    for (var i=0; i<(n+1); i++){
      var prob=pbinomial(i,n,p);
      res.push(prob*100);
      //alert(i+", "+n+", "+p+": "+prob);
    }
    return res;
  }

  
  $("input[name=rollType]").change(function() {
    if ( $("input[name=rollType]:checked").val()=="defense" ){
      $("#attackMods").hide();
      $("#defenseMods").show();
    } else {
      $("#attackMods").show();
      $("#defenseMods").hide();
    }
  });

  $( "#calcButton" ).button().click(function() {
    calcProb();
  }); 


});