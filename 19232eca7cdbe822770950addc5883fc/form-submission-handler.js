(function() 
{
	function validEmail(email) 
	{
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		return re.test(email);
	}

	// get all data in form and return object
	function getFormData(form) 
	{
		var elements = form.elements;

		var fields = Object.keys(elements).filter(function(k) 
		{
			var elm = elements[k];
			if (elm.style !== undefined)
			{
				return (elements[k].name !== "honeypot" && elements[k].style.display !== "none" && elements[k].type !== "radio");
			}
		}).map(function(k) 
		{
			if(elements[k].name !== undefined) 
			{
				return elements[k].name;
				// special case for Edge's html collection
			}
			else if(elements[k].length > 0)
			{
				return elements[k].item(0).name;
			}
		}).filter(function(item, pos, self) 
		{
			return self.indexOf(item) == pos && item;
		});
	
		var formData = {};
		fields.forEach(function(name)
		{
			var element = elements[name];
      
			// singular form elements just have one value
			formData[name] = element.value;

			// when our element has multiple items, get their values
			if (element.length) 
			{
				var data = [];
				for (var i = 0; i < element.length; i++) 
				{
					var item = element.item(i);
					if (item.checked || item.selected) 
					{
						data.push(item.value);
					}
				}
				formData[name] = data.join(', ');
			}
		});

		fields.push("cart");
		
		
		var cartCookie  = GetCookie("cart");
		if (cartCookie)
		{
			var cart = JSON.parse(decodeURIComponent(cartCookie));
			var cartData = [];
			for (var i=0; i<cart.length; i++)
			{
				var it = {};
				it["id"] = cart[i]["id"];
				it["name"] = cart[i]["name"];
				it["price"] = cart[i]["price"];
				it["quantity"] = cart[i]["quantity"];
				cartData.push(JSON.stringify(it));
			}
			formData["cart"] = JSON.stringify(cartData);
			
			/*
			var result = "";
			var cartArray = JSON.parse(formData["cart"]);
			result += "<table cellpadding='5' cellspacing='5' border='1' style='text-align:center;'>";
			for(var i=0; i<cartArray.length; i++)
			{
				var itm = JSON.parse(cartArray[i]);      
				result += "<tr>";	  
			  
				result += "<td>" + itm["id"] + "</td>";
				result += "<td>" + itm["name"] + "</td>";
				result += "<td>" + itm["price"] + "</td>";
				result += "<td>" + itm["quantity"] + "</td>";
				
				result += "</tr>";
			}
			result += "</table>";
			*/
		}
		
		fields.unshift("Modalitate_de_plata");
		
		// add form-specific values into the data
		var order = JSON.stringify(fields);	
		formData.formDataNameOrder = order; //JSON.stringify(fields);
		formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
		formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default
		console.log(formData);
		return formData;
	}

  function handleFormSubmit(event) 
  {  // handles form submit without any jquery
    event.preventDefault();           // we are submitting via xhr below
    var form = event.target || event.srcElement;
    var data = getFormData(form);         // get the values submitted in the form
	
	var method2Radio = document.getElementById("method2");
	if (method2Radio)
	{
		var payMethodStr = "Ramburs la curier";			
		if (method2Radio.checked)
		{
			payMethodStr = "Ordin de plata";
		}
		//var payMethod = {Modalitate_de_plata:payMethodStr};
		data.Modalitate_de_plata = payMethodStr;
	}
	
	//validations
	var isValid = true;
	
	//name
	var invalidName = document.getElementById("name-invalid");
	var nameBox = document.getElementById("name");
	if (data.Denumire_Societate.length == 0)
	{	
		if (invalidName) { invalidName.style.display = "block"; }
		if (nameBox) { nameBox.style.borderColor = "red"; }
		isValid = false;
	}
	else
	{
		if (invalidName) { invalidName.style.display = "none"; }
		if (nameBox) { nameBox.style = null; nameBox.className = "textbox"; }
	}
	//end name
	
	//saddress
	var invalidSaddress = document.getElementById("saddress-invalid");
	var saddressBox = document.getElementById("socialaddress");
	if (data.Sediu_social.length == 0)
	{	
		if (invalidSaddress) { invalidSaddress.style.display = "block"; }
		if (saddressBox) { saddressBox.style.borderColor = "red"; }
		isValid = false;
	}
	else
	{
		if (invalidSaddress) { invalidSaddress.style.display = "none"; }
		if (saddressBox) { saddressBox.style = null; saddressBox.className = "textbox"; }
	}
	//end saddress
	
	//cui
	var invalidCui = document.getElementById("cui-invalid");
	var cuiBox = document.getElementById("cui");
	if (data.CUI.length == 0)
	{	
		if (invalidCui) { invalidCui.style.display = "block"; }
		if (cuiBox) { cuiBox.style.borderColor = "red"; }
		isValid = false;
	}
	else
	{
		if (invalidCui) { invalidCui.style.display = "none"; }
		if (cuiBox) { cuiBox.style = null; cuiBox.className = "textbox"; }
	}
	//end cui
	
	//regcom
	var invalidRegcom = document.getElementById("regcom-invalid");
	var regcomBox = document.getElementById("regcom");
	if (data.NRC.length == 0)
	{	
		if (invalidRegcom) { invalidRegcom.style.display = "block"; }
		if (regcomBox) { regcomBox.style.borderColor = "red"; }
		isValid = false;
	}
	else
	{
		if (invalidRegcom) { invalidRegcom.style.display = "none"; }
		if (regcomBox) { regcomBox.style = null; regcomBox.className = "textbox"; }
	}
	//end regcom
	
	//bankacc
	if ("Cont_Banca" in data)
	{
		var invalidBankacc = document.getElementById("bankacc-invalid");
		var bankaccBox = document.getElementById("bankacc");
		if (data.Cont_Banca.length == 0)
		{	
			if (invalidBankacc) { invalidBankacc.style.display = "block"; }
			if (bankaccBox) { bankaccBox.style.borderColor = "red"; }
			isValid = false;
		}
		else
		{
			if (invalidBankacc) { invalidBankacc.style.display = "none"; }
			if (bankaccBox) { bankaccBox.style = null; bankaccBox.className = "textbox"; }
		}
	}
	//end bankacc
	
	//bank
	if ("Banca" in data)
	{
		var invalidBank = document.getElementById("bank-invalid");
		var bankBox = document.getElementById("bank");
		if (data.Banca.length == 0)
		{	
			if (invalidBank) { invalidBank.style.display = "block"; }
			if (bankBox) { bankBox.style.borderColor = "red"; }
			isValid = false;
		}
		else
		{
			if (invalidBank) { invalidBank.style.display = "none"; }
			if (bankBox) { bankBox.style = null; bankBox.className = "textbox"; }
		}
	}
	//end bank
	
	//address
	var invalidAddress = document.getElementById("address-invalid");
	var addressBox = document.getElementById("address");
	if (data.Adresa_de_livrare.length == 0)
	{	
		if (invalidAddress) { invalidAddress.style.display = "block"; }
		if (addressBox) { addressBox.style.borderColor = "red"; }
		isValid = false;
	}
	else
	{
		if (invalidAddress) { invalidAddress.style.display = "none"; }
		if (addressBox) { addressBox.style = null; addressBox.className = "textbox"; }
	}
	//end address
	
	//postalcode
	var invalidPostalcode = document.getElementById("postalcode-invalid");
	var postalcodeBox = document.getElementById("postalcode");
	if (data.Cod_Postal.length == 0)
	{	
		if (invalidPostalcode) { invalidPostalcode.style.display = "block"; }
		if (postalcodeBox) { postalcodeBox.style.borderColor = "red"; }
		isValid = false;
	}
	else
	{
		if (invalidPostalcode) { invalidPostalcode.style.display = "none"; }
		if (postalcodeBox) { postalcodeBox.style = null; postalcodeBox.className = "textbox"; }
	}
	//end postalcode
	
	//email
	var invalidEmail = document.getElementById("email-invalid"); //form.querySelector(".email-invalid");
	var emailBox = document.getElementById("email"); //form.querySelector(".textbox");
    if(!validEmail(data.Adresa_de_email))
	{
		// if email is not valid show error
		if (invalidEmail) { invalidEmail.style.display = "block"; }		
		if (emailBox) { emailBox.style.borderColor = "red"; }
		isValid = false;
    }
	else
	{
		if (invalidEmail) { invalidEmail.style.display = "none"; }		
		if (emailBox) { emailBox.style = null; emailBox.className = "textbox"; }		
	}
	//end email
	
	//phone
	var invalidTel = document.getElementById("tel-invalid");
	var telBox = document.getElementById("tel");
	if (data.Numar_de_Telefon.length !== 10)
	{
		if (invalidTel) { invalidTel.style.display = "block"; }
		if (telBox) { telBox.style.borderColor = "red"; }
		isValid = false;
	}
	else
	{
		if (invalidTel) { invalidTel.style.display = "none"; }
		if (telBox) { telBox.style = null; telBox.className = "textbox"; }
	}
	//end phone
	
	//obs
	var invalidObs = document.getElementById("obs-invalid");
	var obsBox = document.getElementById("obs");
	if (data.Alte_observatii.length > 200)
	{
		if (invalidObs) { invalidObs.style.display = "block"; invalidObs.innerHTML = "! numar depasit de caractere: " + data.Alte_observatii.length; }
		if (obsBox) { obsBox.style.borderColor = "red"; }
		isValid = false;
	}
	else
	{
		if (invalidObs) { invalidObs.style.display = "none"; }
		if (obsBox) { obsBox.style = null; obsBox.className = "textarea"; }
	}
	//end obs
	
	//human
	var honeypot = document.getElementById("honeypot");
	if (honeypot)
	{
		if (honeypot.length > 0)
		{
			isValid = false;
		}
	}
	//end human
	
	//isValid = false;
	if (isValid)
	{
		var loading = document.getElementById("loading");
		if (loading)
		{
			loading.style.display = "";
		}
	
		disableAllButtons(form);
		var url = form.action;
		var xhr = new XMLHttpRequest();
		xhr.open('POST', url);
		//xhr.withCredentials = true;
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function() 
		{
			console.log(xhr.status, xhr.statusText);
			console.log(xhr.responseText);
			  
			  /*
			  var formElements = form.querySelector(".form-elements")
			  if (formElements) {
				formElements.style.display = "none"; // hide form
			  }
			  
			  /*
			  var thankYouMessage = form.querySelector(".thankyou_message");
			  if (thankYouMessage) {
				thankYouMessage.style.display = "block";
			  }
			  */
			if (this.readyState == 4)
			{
				var status = xhr.statusText;
				if (status == "OK")
				{
					document.cookie = "cart=";
					location.href = "ordercomplette";
				}
				else			
				{
					location.href = "orderfailed";
				}
			}
			return;
		};
      // url encode form data for sending as post data
		var encoded = Object.keys(data).map(function(k) 
		{
			return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
		}).join('&');
		xhr.send(encoded);
	}
  }
  
	function loaded() 
	{
		console.log("Contact form submission handler loaded successfully.");
		// bind to the submit event of our form
		var forms = document.querySelectorAll("form");
		for (var i = 0; i < forms.length; i++) 
		{
			forms[i].addEventListener("submit", handleFormSubmit, false);
		}
	};
	
	if (document.addEventListener)
	{
		document.addEventListener("DOMContentLoaded", loaded, false);
	}
	
	function disableAllButtons(form) 
	{
		var buttons = form.querySelectorAll("button");
		for (var i = 0; i < buttons.length; i++) 
		{
		  buttons[i].disabled = true;
		  buttons[i].className = "button-default-disabled";
		}
	}
})();
