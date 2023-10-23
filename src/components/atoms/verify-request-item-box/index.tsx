import { FC } from "react";
import RejectButton from "../reject-button";
import ApproveButton from "../approve-button";

type VerifyRequestItemBoxProps = {
    picture: string;
    feature: string;
    description: string;
}

const VerifyRequestItemBox: FC<VerifyRequestItemBoxProps> = ({ picture, feature, description }) => {
    return (
        <div className="bg-white rounded p-2.5 flex gap-2 text-xs hover:shadow-sm border border-gray-200 items-center">
            <div>
                <img className="w-8 h-8 rounded-full" src={picture}></img>
            </div>

            <div className="w-full truncate">
                <div className="text-xs text-gray-600 uppercase">{feature}</div>
                <div className="w-full text-sm">{description}</div>
            </div>

            <button>
                <RejectButton icon="" message="Reject" />
            </button>

            <button>
                <ApproveButton icon="" message="Approve" />
            </button>
        </div>
    )
}

export default VerifyRequestItemBox;