#addin "nuget:?package=Cake.SquareLogo"

Task("Icon").Does(() =>{
    CreateLogo("Webpack", "images/icon.png", new LogoSettings {
        Background = "Green",
        Foreground = "White",
        Padding = 30
    });
});

var target = Argument("target", "default");
RunTarget(target);