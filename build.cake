#addin "nuget:?package=Cake.SquareLogo"

Task("Logo").Does(() =>{
    CreateLogo("Webpack", "images/icon.png", new LogoSettings {
        Background = "DarkSlateBlue",
        Foreground = "White",
        Padding = 30
    });
});

var target = Argument("target", "default");
RunTarget(target);