/*
File: Accuweb Layout JS
Author: Mark Cheng (lujiang.cheng@gmail.com)
 */


$(function() {
    var navSelect = $('nav select'),
        navMenu = $("nav .menu"),
        navSubmenu = $("nav>ul>li:not(:first-child):not(:last-child)"),
        navDropdown = $("nav .drop-down-list"),
        searchForm = $("#header_form"),
        searchInput = $("#search_keywords"),
        searchSubmit = $("#search_submit"),
        downloadButton = $("#download_button"),
        downloadSelection = $("#download_selection"),
        languageSelection = $("#language");

    /* Navigation menu interaction
    --------------------------------------------------------------------------------------------------------------------- */
    navSelect.on('change', function() { // for extra small screen
        var url = $(this).val();
        if (url) {
            window.location = url;
        }
        return false;
    });

    navMenu.on("click", function() { // for small and medium screen
        navSubmenu.slideToggle();
    })

    navDropdown.on("click", function(e) { // for small and medium screen
        if ($(window).width() <= 1199) {
            $(this).children("ul").slideToggle();
            if ($(this).children("span").hasClass("glyphicon-chevron-right")) {
                $(this).children("span").removeClass('glyphicon-chevron-right').addClass('glyphicon-chevron-down').css("color", "#ffe400");
                $(this).children("a").css("color", "#ffe400")
            } else {
                $(this).children("span").removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-right').css("color", "#ffffff");
                $(this).children("a").css("color", "#ffffff")
            }
        }
    })

    /* Search box operation
    --------------------------------------------------------------------------------------------------------------------- */
    searchInput.on({
        focus: function() {
            $(this).val("").css({
                "background-color": "#ffffff",
                "color": "#000000"
            }).attr("placeholder", "");

        },
        blur: function() {
            if (!$(this).val()) $(this).attr("placeholder", "Search Accusilicon website in Google");
        }
    })
    searchForm.on("submit", function(e) {
            e.preventDefault();
            var searchKeywords = "",
                searchURL = "";
            if (searchInput.val()) {
                searchKeywords = searchInput.val();
                searchURL = "https://www.google.com/search?q=" + searchKeywords.split(" ").join("+") + "+site%3Awww.accusilicon.com";
                window.open(searchURL);
            } else {
                searchInput.css({
                    "background-color": "#ffcccc",
                    "color": "#ffffff"
                }).val("Please enter your keywords here!");
            }
        }

    )

    /* Document download
    --------------------------------------------------------------------------------------------------------------------- */
    downloadSelection.on('change', function() {
        var url = downloadSelection.val();
        if (url) {
            downloadButton.prop('disabled', false);
        }
    });

    downloadButton.on('click', function() {
        var url = downloadSelection.val();
        if (url) {
            window.open(url);
        }
        return false;
    });


    /* Language selection
    --------------------------------------------------------------------------------------------------------------------- */
    languageSelection.on('click', function(e) {
        e.preventDefault();
        document.cookie = "language=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        var d = new Date();
        d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        switch (languageSelection.data("language")) {
            case "en":                
                document.cookie = "language=en;" + expires + ";path=/";
                location.href = ((document.URL).replace("/cn/", "/en/"));
                break;
            case "cn":                
                document.cookie = "language=cn;" + expires + ";path=/";
                location.href = ((document.URL).replace("/en/", "/cn/"));
                break;
        }
    })
})
