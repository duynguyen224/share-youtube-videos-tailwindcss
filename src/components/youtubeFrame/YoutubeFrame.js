import React from "react";

function YoutubeFrame(props) {
    const { video, width, height } = props;

    return (
        <iframe
            width={width ? width : "100%"}
            height={height ? height : "194"}
            src={`https://www.youtube.com/embed/${video.id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
        />
    );
}

export default YoutubeFrame;
