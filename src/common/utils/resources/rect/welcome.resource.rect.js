function getRectWelcomeResource() {
    return [
        {
            dimensions: {
                welcomeLogoLeftPadding: '20.234375vw',
                welcomeLogoRightPadding: '20.234375vw',
                welcomeTextSize: '48px',
                welcomeImageWidth: '64.296875vw',
            },
        },
        {
            when: '${@viewportProfile == @tvLandscapeXLarge}',
            dimensions: {
                welcomeImageWidth: '67vw',
            },
        },
        {
            when: '${@viewportProfile == @hubLandscapeSmall}',
            dimensions: {
                welcomeLogoLeftPadding: '19.734375vw',
                welcomeLogoRightPadding: '20.234375vw',
            },
        },
        {
            when: '${viewport.width >= 480 && viewport.width < 1023 }',
            dimensions: {
                welcomeTextSize: '40px',
            },
        },
        {
            when: '${viewport.width >= 1024 && viewport.width < 1280 }',
            dimensions: {
                welcomeTextSize: '48px',
            },
        },
        {
            when: '${viewport.width >= 1281 && viewport.width < 1920 }',
            dimensions: {
                welcomeTextSize: '64px',
            },
        },
    ];
}
exports.getRectWelcomeResource = getRectWelcomeResource;
