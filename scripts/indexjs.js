//signin span slide

var searchText=document.getElementById("sspan");
searchText.style.marginLeft="-32%";
function searchInputAnime(){
    if(searchText.style.marginLeft=="-32%"){
            searchText.style.marginLeft="0%";
        }
        else{
            searchText.style.marginLeft="-32%";
        }
    };

var firstNameText=document.getElementById("fspan");
firstNameText.style.marginLeft="-30%";
function firstNameAnime(){
    if(firstNameText.style.marginLeft=="-30%")
    {
  firstNameText.style.marginLeft="0%";
    }
    else{
        firstNameText.style.marginLeft="-30%";
    }
};

var middleNameText=document.getElementById("mspan");
middleNameText.style.marginLeft="-50%";
function middleNameAnime(){
    if(middleNameText.style.marginLeft=="-50%")
    {
        middleNameText.style.marginLeft="0%";
    }
    else{
        middleNameText.style.marginLeft="-50%";
    }

};

var lastNameText=document.getElementById("lspan");
lastNameText.style.marginLeft="-45%";
function lastNameAnime(){
    if(lastNameText.style.marginLeft=="-45%")
    {
        lastNameText.style.marginLeft="0%";
    }
    else{
        lastNameText.style.marginLeft="-45%";
    }
};

var phoneInputText=document.getElementById("phspan");
phoneInputText.style.marginLeft="-37%";
function phoneInputAnime(){
    if(phoneInputText.style.marginLeft=="-37%")
    {
        phoneInputText.style.marginLeft="0%";
    }
    else{
        phoneInputText.style.marginLeft="-37%";
    }
};

var gmailInputText=document.getElementById("gmspan");
gmailInputText.style.marginLeft="-38%";
function gmailInputAnime()
{
    if(gmailInputText.style.marginLeft=="-38%")
    {
        gmailInputText.style.marginLeft="0%";
    }
    else{
        gmailInputText.style.marginLeft="-38%";
    }
};

var passInputText=document.getElementById("paspan");
passInputText.style.marginLeft="-14%";
function passInputAnime()
{
        if(passInputText.style.marginLeft=="-14%")
        {
            passInputText.style.marginLeft="0%";
        }
        else{
            passInputText.style.marginLeft="-14%";
        }
};


// login and signin cover
var input=document.getElementById("log");
input.style.maxHeight="0px";
input.style.display="none";

var secondInput=document.getElementById("sign");
secondInput.style.maxHeight="0px";
secondInput.style.display="none";


function popupOne()
            {
                if(input.style.maxHeight=="0px" && input.style.display=="none")
                {
                    input.style.maxHeight="700px";
                    input.style.display="block";
                    input.style.transition="0.5s";
                    secondInput.style.maxHeight="0px";
                    secondInput.style.display="none";
                }
                else
                {
                 input.style.maxHeight="0px";
                input.style.transition="0.5s";
                input.style.display="none";
                }
            }

            function popupTwo()
            {
                if(secondInput.style.maxHeight=="0px" && secondInput.style.display=="none")
                {
                    secondInput.style.maxHeight="700px";
                    secondInput.style.display="block";
                    secondInput.style.transition="0.5s";
                    input.style.maxHeight="0px";
                    input.style.display="none";
                }
                else
                {
                 secondInput.style.maxHeight="0px";
                secondInput.style.display="none";
                secondInput.style.transition="0.5s";
                }
            }

//forgot bottons option animation
            var bottoms=document.getElementById("more");
        bottoms.style.display="none";

        function option(){
        if(bottoms.style.display=="none"){
            bottoms.style.display="block";
        }
        else{
            bottoms.style.display="none";
        }
        };

//login span animation
        var passText=document.getElementById("pSpan");
        var gText=document.getElementById("gSpan");
        passText.style.marginLeft="-45%";
        gText.style.marginLeft="-53%";

        function pAnime(){
            if(passText.style.marginLeft=="-45%"){
                passText.style.marginLeft="0%";
            }
            else{
                passText.style.marginLeft="-45%";
            }
        };

        function gAnime(){
            if(gText.style.marginLeft=="-53%"){
                gText.style.marginLeft="0%";
            }
            else{
                gText.style.marginLeft="-53%";
            }
        }

            //menu buttons animation working on the mobile view
            var menulist=document.getElementById("menulist");
            var vanish=document.getElementById("buttons");
            menulist.style.maxHeight="0px";
        
        
            function togglemenu()
            {
        
                if(menulist.style.maxHeight=="0px")
                {
                    menulist.style.maxHeight="500px"
                    menulist.style.display="block";
                    menulist.style.opacity="0.9";
                    vanish.style.display="none";
                   // menulist.style.transition=".5s";
                }
                else
                {
                 menulist.style.maxHeight="0px";
                menulist.style.display="none";
                vanish.style.display="block";                // menulist.style.transition=".5s";
                }
            }