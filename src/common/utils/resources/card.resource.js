function getCardResource() {
    return [
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

exports.getCardResource = getCardResource;
