import moment from "moment";
import * as React from "react";
import { defaultAvatar } from "../../constants";
import { convertDateToLongDate, convertToInternationalCurrencySystem, sliceText } from "../../utils";
import Skeleton from "../common/Skeleton";
import YoutubeFrame from "../youtubeFrame/YoutubeFrame";

export default function Video(props) {
    const {video, loading} = props


    const renderVideo = () => {
        if(loading){
            return <Skeleton/>
        }
        else{
            return (
                <div>
                    <div className="flex p-3">
                        <img src={video.createdBy.imageUrl || defaultAvatar} className="w-12 h-12 rounded-full mr-3"/>
                        <div>
                            <div className="text-black">{video.createdBy.username}</div>
                            <div className="text-gray-500">{convertDateToLongDate(video.createdAt)}</div>
                        </div>                
                    </div>
                    <div>
                        <YoutubeFrame video={video}/>
                    </div>
                    <div>
                        <div className="p-3 font-semibold">{sliceText(video.snippet.title)}</div>
                        <div className="p-1 pl-3 pt-0">{video.snippet.channelTitle}</div>
                    </div>
                    <div className="p-3 pt-0">
                        <div>
                            <span>{convertToInternationalCurrencySystem(video.statistics.viewCount)} views</span> • <span>{moment(video.snippet.publishedAt).fromNow()}</span>
                        </div>
                        <div>
                            {convertToInternationalCurrencySystem(video.statistics.likeCount)} likes 👍
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            {renderVideo()}
        </div>
    );
}
