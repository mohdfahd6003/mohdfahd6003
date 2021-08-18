function getResources() {
    return [
        {
            when: '${viewport.width < 1200}',
            string: {
                resolution: '_20x20.jpeg',
            },
        },
        {
            when: '${viewport.width < 500}',
            string: {
                resolution: '.jpg',
            },
        },
        {
            when: '${viewport.width >= 1200}',
            string: {
                resolution: '.jpg',
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
        {
            numbers: {
                numberOfVisibleCards: 3.5,
                spacingBetweenCards: '@spacingLarge',
                imageAspectRatio: 1.1037,
                cardContentHeight: 500,
                cardContentTitleMaxLines: 2,
            },
            dimensions: {
                cardContentPadding: '@spacingMedium',
                gridListHeight: '75vh',
            },
        },
        {
            when: '${@viewportProfile == @tvLandscapeXLarge}',
            numbers: {
                numberOfVisibleCards: 4.5,
                cardContentHeight: 120,
                cardContentTitleMaxLines: 2,
            },
            dimensions: {
                cardContentPadding: '@spacingMedium',
            },
        },
        {
            when: '${@viewportProfile == @hubRoundSmall}',
            numbers: {
                numberOfVisibleCards: 1.25,
                cardContentHeight: 173,
                cardContentTitleMaxLines: 2,
            },
            dimensions: {
                gridListHeight: '77.5vh',
            },
        },
        {
            when: '${@viewportProfile == @mobileSmall}',
            numbers: {
                numberOfVisibleCards: 1.5,
            },
        },
        {
            when:
                '${@viewportProfile == @hubLandscapeMedium || @viewportProfile == @hubLandscapeSmall || @viewportProfile == @mobileMedium || (@viewportProfile == @mobileSmall)}',
            numbers: {
                numberOfVisibleCards: 2.5,
            },
        },
        {
            when: '${@viewportProfile == @mobileLarge}',
            numbers: {
                numberOfVisibleCards: 3.5,
            },
        },
        {
            dimensions: {
                cardWidth:
                    '${Math.round((viewport.width - @spacingMedium - (@spacingBetweenCards * @numberOfVisibleCards)) / @numberOfVisibleCards)}',
                imageWidth: '${@viewportProfile == @hubRoundSmall ? @cardWidth : 23.28vw }',
                imageHeight: '${@cardWidth / @imageAspectRatio}',
                cardHeight: '${@imageHeight + @cardContentHeight}',
            },
        },
        {
            when: '${@viewportProfile == @tvLandscapeXLarge}',
            dimensions: {
                imageWidth: '19.5vw',
            },
        },
    ];
}

exports.getResources = getResources;
