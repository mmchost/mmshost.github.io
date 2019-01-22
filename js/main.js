function RefreshCartItemsCount()
{
	var cartItemsCount = document.getElementById("cartitemscount");
	if (cartItemsCount)
	{
		if(cart.length > 0)
		{
			cartItemsCount.style.display = "inline-block";
			cartItemsCount.innerHTML =  cart.length;			
		}
		else
		{
			cartItemsCount.style.display = "inline-block"; //"none";
			cartItemsCount.innerHTML =  cart.length;			
		}
		
		var cartMenuItem = document.getElementById("cartMenuItem");		
		if (cartMenuItem)
		{
			cartMenuItem.title = "Cosul de cumparaturi\u000dArticole: " + cart.length;
		}
	}
}

function Page_OnResize(imagesPath)
{
	//data:image/png;base64,
    var banner1920 = "<img style=\"border-style:none; max-width:1920px; max-height:480px; width:100%; pointer-events:none;\" src=\"" + imagesPath + "banner/1920x480.png\" alt=\"radiografii dentare, tomografii 3d cbct, radiologie dentara\"/>";
	var banner1280 = "<img style=\"border-style:none; max-width:1280px; max-height:480px; width:100%; pointer-events:none;\" src=\"" + imagesPath + "banner/1280x480.png\" alt=\"radiografii dentare, tomografii 3d cbct, radiologie dentara\"/>";
	var banner960 = "<img style=\"border-style:none; max-width:960px; max-height:480px; width:100%; pointer-events:none;\" src=\"" + imagesPath + "banner/960x480.png\" alt=\"radiografii dentare, tomografii 3d cbct, radiologie dentara\"/>";
	var banner640 = "<img style=\"border-style:none; max-width:640px; max-height:320px; width:100%; pointer-events:none;\" src=\"" + imagesPath + "banner/640x320.png\" alt=\"radiografii dentare, tomografii 3d cbct, radiologie dentara\"/>";
	var banner480 = "<img style=\"border-style:none; max-width:480px; max-height:320px; width:100%; pointer-events:none;\" src=\"" + imagesPath + "banner/480x320.png\" alt=\"radiografii dentare, tomografii 3d cbct, radiologie dentara\"/>";
	var banner320 = "<img style=\"border-style:none; max-width:320px; max-height:320px; width:100%; pointer-events:none;\" src=\"" + imagesPath + "banner/320x320.png\" alt=\"radiografii dentare, tomografii 3d cbct, radiologie dentara\"/>";
	var banner240 = "<img style=\"border-style:none; max-width:240px; max-height:320px; width:100%; pointer-events:none;\" src=\"" + imagesPath + "banner/240x320.png\" alt=\"radiografii dentare, tomografii 3d cbct, radiologie dentara\"/>";

	var map1920 = "<img style=\"border-style:none; max-width:1920px; max-height:480px; width:100%; pointer-events:none;\" src=\"" + imagesPath + "map/1920x480.png\" alt=\"radiologie dentara cluj, radiografii dentare cluj, medios medical center cluj\"/>";
	var map1280 = "<img style=\"border-style:none; max-width:1280px; max-height:480px; width:100%; pointer-events:none;\" src=\"" + imagesPath + "map/1280x480.png\" alt=\"radiologie dentara cluj, radiografii dentare cluj, medios medical center cluj\"/>";
	var map960 = "<img style=\"border-style:none; max-width:960px; max-height:480px; width:100%; pointer-events:none;\" src=\"" + imagesPath + "map/960x480.png\" alt=\"radiologie dentara cluj, radiografii dentare cluj, medios medical center cluj\"/>";
	var map640 = "<img style=\"border-style:none; max-width:640px; max-height:320px; width:100%; pointer-events:none;\" src=\"" + imagesPath + "map/640x320.png\" alt=\"radiologie dentara cluj, radiografii dentare cluj, medios medical center cluj\"/>";
	var map480 = "<img style=\"border-style:none; max-width:480px; max-height:320px; width:100%; pointer-events:none;\" src=\"" + imagesPath + "map/480x320.png\" alt=\"radiologie dentara cluj, radiografii dentare cluj, medios medical center cluj\"/>";
	var map320 = "<img style=\"border-style:none; max-width:320px; max-height:320px; width:100%; pointer-events:none;\" src=\"" + imagesPath + "map/320x320.png\" alt=\"radiologie dentara cluj, radiografii dentare cluj, medios medical center cluj\"/>";
	var map240 = "<img style=\"border-style:none; max-width:240px; max-height:320px; width:100%; pointer-events:none;\" src=\"" + imagesPath + "map/240x320.png\" alt=\"radiologie dentara cluj, radiografii dentare cluj, medios medical center cluj\"/>";
	
	var bannerID = "banner";
	var mapID = "map";
    var w = window.innerWidth || document.documentElement.clientWidth || documentBody.clientWidth;    
	
	var banner = document.getElementById(bannerID);
	var map = document.getElementById(mapID)
		
    if (w>=1280)
	{
		if (banner)
		{
			banner.innerHTML = banner1920;
		}
		if (map)
		{		
			map.innerHTML = map1920;
		}
	}
    if (w<=1280)
    {
		if (banner)
		{
			banner.innerHTML = banner1280;
		}
		if (map)
		{
			map.innerHTML = map1280;
		}
    }
    if (w<=960)
    {
		if (banner)
		{
			banner.innerHTML = banner960;
		}
		if (map)
		{
			map.innerHTML = map960;
		}
    }
	if (w<=640)
    {
		if (banner)
		{
			banner.innerHTML = banner640;
		}
		if (map)
		{
			map.innerHTML = map640;
		}
    }
	if (w<=480)
    {
		if (banner)
		{
			banner.innerHTML = banner480;
		}
		if (map)
		{
			map.innerHTML = map480;
		}
    }
	if (w<=320)
    {	
		if (banner)
		{
			banner.innerHTML = banner320;
		}
		if (map)
		{
			map.innerHTML = map320;
		}
    }
	if (w<=240)
    {
		if (banner)
		{
			banner.innerHTML = banner240;
		}
		if (map)
		{
			map.innerHTML = map240;
		}
    }
	
	RefreshPosition();
}

function Page_OnLoad(addCart, showInfoBar, showCookiesBar, isStore, imagesPath, isMainPage) 
{
	InitializeComponent(isStore, addCart, imagesPath, isMainPage);
	if (showInfoBar)
	{
		InitializeInfoBar(imagesPath);
	}
	if (showCookiesBar)
	{
		InitializeCookiesBar(imagesPath);
	}
	$.smoothAnchors("slow");

	Page_OnResize(imagesPath);
}

function RefreshPosition()
{
	var wb = document.getElementById("warning-bar");
	var sectionTag1 = document.getElementById("sectionTag1");
	var sectionTag2 = document.getElementById("sectionTag2");
	var sectionTag3 = document.getElementById("sectionTag3");
	var mainContent = document.getElementById("main-content");
	var header = document.getElementById("header");	
	
	if (wb)
	{
		header.setAttribute('style', 'top:' + wb.clientHeight + 'px;');
		
		var contentHeight = wb.clientHeight + header.clientHeight;
		mainContent.setAttribute('style', 'top:' + contentHeight + 'px;');
		
		if (sectionTag1)
		{
			sectionTag1.setAttribute('style', 'height:' + contentHeight + 'px; margin-top:' + -contentHeight + 'px;');
		}
		if (sectionTag2)
		{
			sectionTag2.setAttribute('style', 'height:' + contentHeight + 'px; margin-top:' + -contentHeight + 'px;');
		}
		if (sectionTag3)
		{
			sectionTag3.setAttribute('style', 'height:' + contentHeight + 'px; margin-top:' + -contentHeight + 'px;');
		}
	}
	else	
	{
		mainContent.setAttribute('style', 'top:' + header.clientHeight + 'px;');
	
		if (sectionTag1)
		{
			sectionTag1.setAttribute('style', 'height:' + header.clientHeight + 'px; margin-top:' + -header.clientHeight + 'px;');
		}
		if (sectionTag2)
		{
			sectionTag2.setAttribute('style', 'height:' + header.clientHeight + 'px; margin-top:' + -header.clientHeight + 'px;');
		}
		if (sectionTag3)
		{
			sectionTag3.setAttribute('style', 'height:' + header.clientHeight + 'px; margin-top:' + -header.clientHeight + 'px;');
		}
	}
	
	var footerBar = document.getElementById("cookies-bar");
	var footerCopyright = document.getElementById("footer-copyright-ws");
	if (footerBar)
	{
		var val = footerBar.clientHeight + 48;
		footerCopyright.setAttribute('style', 'height:' + val + 'px;');
	}
}

function InitializeComponent(isStore, addCart, imagesPath, isMainPage)
{
	var storeMenu = 
	"<td class=\"menu-item\">" +
	"<a href=\"https://store.mediosmedical.ro\">MAGAZIN</a>" +
	"</td>";
	var cartMenu = "";
	var homeMenu = "<a href=\"index.html\">ACAS&#258;</a>";
	if (isMainPage)
	{
		homeMenu = "<a href=\"#home\">ACAS&#258;</a>";
	}
	if (addCart)
	{
		cartMenu = 
		"<td id=\"cartMenuItem\" class=\"menu-item\" style=\"cursor:pointer;\" title=\"Cosul de cumparaturi\">" +
		"<center>" +
		"<a href=\"cart\" onclick=\"CartButton_Click()\">" +
		"<table cellpadding=\"0\" cellspacing=\"0\"><tr><td>COS&nbsp;</td><td><img class=\"cart-image\" src=\"" + imagesPath + "cart.png\"/>" +
		"<span class=\"cart-items-count\" id=\"cartitemscount\">99</span></td></tr></table>" +
		"</a>" +
		"</center>" +
		"</td>";		
	}
	if (isStore)
	{
		storeMenu = "<td class=\"menu-item\"><a href=\"index.html\">PRODUSE</a></td>";
		if (isMainPage)
		{
			storeMenu = "<td class=\"menu-item\"><a href=\"#products\">PRODUSE</a></td>";
		}
	}

	var header = document.getElementById("header");
	if (header)
	{
		var row = header.insertRow(0);
		if (row)
		{
			var cell = row.insertCell(0);
			if (cell)
			{
				cell.innerHTML = 
				"<!--[if lt IE 9]>" +
				"<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"display:inline-block;\">" +
				"<tr>" +
				"<td class=\"header-cell\" style=\"background:#005B99;\"><a href=\"https://mediosmedical.ro\"><img src=\"images/" + "logo-store.png\" class=\"header-logo\" onContextMenu=\"return false;\"/></a></td>" +
				"<td class=\"menu-separator\"></td>" +
				"<td class=\"menu-item\">" +
				homeMenu +
				"</td>" +
				storeMenu +
				"<td class=\"menu-item\">" +
				"<a href=\"https://www.mediosmedical.ro/#exams\">SERVICII</a>" +
				"</td>" +
				"<td class=\"menu-item\">" +
				"<a href=\"#contact\">CONTACT</a>" +
				"</td>" +
				cartMenu +
				"</tr>" +
				"</table>" +
				"<![endif]-->" +
				
				"<!--[if gt IE 8]> <!-- -->" +
				"<table class=\"header-menu\" cellpadding=\"0\" cellspacing=\"0\">" +
				"<tr>" +
				"<td class=\"header-cell\"><a href=\"https://store.mediosmedical.ro\"><img class=\"header-logo\" src=\"" + imagesPath + "logo-store.png\" alt=\"Medios Online Store\"/></a></td>" +
				"<td class=\"menu-separator\"></td>" +
				"</tr>" +
				"</table>" +
				"<table class=\"header-menu\" cellpadding=\"0\" cellspacing=\"0\">" +
				"<tr>" +
				"<td class=\"header-menu-cell\">" +
				"<table cellpadding=\"0\" cellspacing=\"0\" align=\"center\">" +
				"<tr id=\"main-menu\">" +
				"<td class=\"menu-item\">" +
				"<center><a href=\"index.html\">ACAS&#258;</a></center>" +
				"</td>" +				
				"<td class=\"menu-item\">" +
				"<center><a href=\"https://www.mediosmedical.ro/#exams\">SERVICII</a></center>" +
				"</td>" +
				storeMenu +
				"<td class=\"menu-item\">" +
				"<center><a href=\"#contact\">CONTACT</a></center>" +
				"</td>" +
				cartMenu +				
				"</tr>" +
				"</table>" +
				"</td>" +
				"</tr>" +
				"</table>" +
				"<!-- <![endif]-->";
			}
		}
	}
		
	var footerContact = document.getElementById("footerContact");
	if (footerContact)
	{
		try
		{		
			var request = new XMLHttpRequest();
			request.onreadystatechange = function()
			{
				if (this.readyState == 4 && this.status == 200) 
				{
					var xmlDoc = this.responseXML;
					
					var contactElement = xmlDoc.getElementsByTagName("contact");
					var contact = contactElement[0].innerHTML;
					contact = contact.trim();
					while (contact.includes("\n"))
					{
						contact = contact.replace("\n", "<br/>")
					}

					var programElement = xmlDoc.getElementsByTagName("program");
					var program = programElement[0].innerHTML;
					program = program.trim();
					while (program.includes("\n"))
					{
						program = program.replace("\n", "<br/>");
					}
					
					footerContact.innerHTML = 
					"<table cellpadding=\"0\" cellspacing=\"0\" align=\"center\" border=\"0\">" +
					"<tr><td>" +
					
					"<table style=\"display:inline-block; min-width:300px; margin-top:10px; margin-bottom:10px; margin-left:10px;\" cellspacing=\"0\" cellpadding=\"0\">" +
					"<tr><td class=\"footer-title\">PROGRAM</td></tr>" +
					"<tr><td style=\"white-space:nowrap; text-align:left;\">" + program + "</td></tr>" +
					/*
					"<tr><td style=\"white-space:nowrap; text-align:left;\">S&#226;mb&#259;t&#259;: 09:00-13:00</td></tr>" +
					"<tr><td style=\"white-space:nowrap; text-align:left;\">Duminic&#259;: &#206;nchis</td></tr>" +
					*/
					"</table>" +

					"<table style=\"display:inline-block; margin-top:10px; margin-bottom:10px; margin-left:10px; margin-right:10px;\" cellspacing=\"0\" cellpadding=\"0\">" +
					"<tr><td class=\"footer-title\">CONTACT</td></tr>" +
					"<tr><td style=\"white-space:nowrap; text-align:left;\">" + contact + "</td></tr>" +
					/*
					"<tr><td style=\"white-space:nowrap; text-align:left;\">Tel: 0743929996</td></tr>" +
					"<tr><td style=\"white-space:nowrap; text-align:left;\">Email: mediosmedical@gmail.com</td></tr>" +
					*/		
					"</table>" +

					"</td></tr>" +
					"</table>";
				}
			};
			request.open("GET", "info.xml", true);
			request.send();
		}
		catch(ex){}
	}
	
	var footerMenu = document.getElementById("footerMenu");
	if (footerMenu)
	{
		var storeMenu = "Magazin";
		if (isStore)
		{
			storeMenu = "Produse";
		}
	
		footerMenu.innerHTML = 
		"<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"font-size:14px; color:#999999; margin-left:10px;\">" +
		"<tr>" +
		"<td><img class=\"logo-footer\" src=\"" + imagesPath + "logo_small.png\" alt=\"Medios Online Store\"/></td>" +
		"<td>" +
		"<table cellpadding=\"0\" cellspacing=\"0\">" +
		"<tr>" +
		"<td class=\"footer-menu\"><a href=\"index.html\">Acas&#259;</a></td>" +
		"<td style=\"vertical-align:middle;\"><a class=\"footer-separator\"></a></td>" +		
		"<td class=\"footer-menu\"><a href=\"https://www.mediosmedical.ro/#exams\">Servicii</a></td>" +
		"<td style=\"vertical-align:middle;\"><a class=\"footer-separator\"></a></td>" +
		"<td class=\"footer-menu\"><a href=\"#products\">" + storeMenu + "</a></td>" +
		"<td style=\"vertical-align:middle;\"><a class=\"footer-separator\"></a></td>" +
		"<td class=\"footer-menu\"><a href=\"#contact\">Contact</a></td>" +
		"</tr>" +
		"</table>" +
		"</td>" +
		"<td width=\"100%\"></td>" +
		"</tr>" +
		"</table>";
	}
	
	var footerCopyright = document.getElementById("footer-copyright-ws");
	if (footerCopyright)
	{
		footerCopyright.innerHTML = "<p>&#169; 2018 MEDIOS MEDICAL CENTER. Toate drepturile rezervate.</p>";
	}
}

function InitializeInfoBar(imagesPath)
{
	var info = GetCookie("headerBar");
	if (info)
	{
		return;
	}

	var headerBar = document.getElementById("headerBar");
	if (headerBar)
	{
		headerBar.innerHTML = 		
		"<table id=\"warning-bar\" class=\"info-bar\" cellpadding=\"0\" cellspacing=\"0\">" +
		"<tr>" +
		"<td style=\"text-align:right; padding-right:10px;\"><img class=\"info-bar-icon\" src=\"" + imagesPath + "info.png\"/></td>" +
		"<td class=\"info-bar-container\">" +
		"<div class=\"info-bar-content\">" +
		"<a title=\"" + 
		"TBA" + 
		"\">" + 
		"Program de lucru pentru perioada [29.12.2018 - 02.01.2019]" + "<br/>" +
		"24.12.2018, 27.12.2018, 28.12.2018 : 08:30 - 18:00" + "<br/>" +
		"25.12.2018, 26.12.2018 : Inchis" + "<br/>" +
		"29.12.2018 - 02.01.2019 : Inchis" +
		"</a>" +
		"</div>" +
		"</td>" +
		"<td class=\"info-bar-cell\"><button class=\"button\" onclick=\"WarningButton_Click()\">OK</button></td>" +
		"</tr>" +
		"</table>";
	}
}

function InitializeCookiesBar(imagesPath)
{
	var footerBar = GetCookie("footerBar");
	if (footerBar)
	{
		return;
	}
	
	var footerBar = document.getElementById("footerBar");
	if (footerBar)
	{
		footerBar.innerHTML = 		
		"<table id=\"cookies-bar\" class=\"cookiesbar\" cellpadding=\"0\" cellspacing=\"0\">" +
		"<tr>" +
		"<td style=\"text-align:right; padding-right:10px;\"><img class=\"info-bar-icon\" src=\"" + imagesPath + "info.png\"/></td>" +
		"<td class=\"info-bar-container\" style=\"font-weight:normal;\">" +
		"<div class=\"info-bar-content\">" +
		"<a title=\"" + 
		"Informa&#539;ie: Acest website nu foloseste cookies. Pute&#539;i naviga &#238;n siguran&#539;&#259;!" +
		"\">" +
		"Informa&#539;ie: Acest website nu foloseste cookies. Pute&#539;i naviga &#238;n siguran&#539;&#259;!" +
		"</a>" +
		"</td>" +
		"<td class=\"info-bar-cell\"><button class=\"button\" onclick=\"CookiesButton_Click()\">OK</button></td>" +
		"</tr>" +
		"</table>";
	}
}
