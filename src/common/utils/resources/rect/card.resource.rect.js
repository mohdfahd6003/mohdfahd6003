function getRectCardResource() {
    return [
        {
            numbers: {
                spacingBetweenCards: '@spacingLarge',
                cardContentHeight: 500,
                cardContentTitleMaxLines: 2,
            },
            dimensions: {
                cardContentPadding: '@spacingMedium',
                gridListHeight: '75vh',
                gridImagePadding: '12px',
            },
        },
        {
            when: '${@viewportProfile == @tvLandscapeXLarge}',
            numbers: {
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
                cardContentHeight: 173,
                cardContentTitleMaxLines: 2,
            },
            dimensions: {
                gridListHeight: '77.5vh',
            },
        },

        {
            dimensions: {
                cardWidth: '${@viewportProfile == @tvLandscapeXLarge ? 20.83vw : 25.78vw}',
                imageWidth: '${@viewportProfile == @hubRoundSmall ? 67vw : 23.90625vw }',
                imageHeight: '35vh',
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

exports.getRectCardResource = getRectCardResource;
