function getRectIntrodunctionResource() {
    return [
        {
            dimensions: {
                introImageWidth: '64.296875vw',
                logoLeftPadding: '21.234375vw',
                logoRightPadding: '21.234375vw',
                scrollViewHeight: '35vh',
            },
        },
        {
            when: '${@viewportProfile == @tvLandscapeXLarge}',
            dimensions: {
                introImageWidth: '67vw',
                scrollViewHeight: '14.5vh',
            },
        },
        {
            when: '${@viewportProfile == @mobileLarge}',
            dimensions: {
                introImageWidth: '67vw',
            },
        },
        {
            when: '${@viewportProfile == @hubLandscapeSmall}',
            dimensions: {
                logoLeftPadding: '20.834375vw',
                logoRightPadding: '21.234375vw',
            },
        },
        {
            dimensions: {
                introImageWidth: '64.296875vw',
                logoLeftPadding: '21.234375vw',
                logoRightPadding: '21.234375vw',
                scrollViewHeight: '35vh',
            },
        },
        {
            when: '${@viewportProfile == @tvLandscapeXLarge}',
            dimensions: {
                introImageWidth: '67vw',
                scrollViewHeight: '14.5vh',
            },
        },
        {
            when: '${@viewportProfile == @mobileLarge}',
            dimensions: {
                introImageWidth: '67vw',
            },
        },
        {
            when: '${@viewportProfile == @hubLandscapeSmall}',
            dimensions: {
                logoLeftPadding: '20.834375vw',
                logoRightPadding: '21.234375vw',
            },
        },
    ];
}

exports.getRectIntroductionResource = getRectIntrodunctionResource;
