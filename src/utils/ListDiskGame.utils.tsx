import classNames from 'classnames'
import { memo, useState } from 'react'
import { Link } from 'react-router-dom'

function ListDiskGameUtils(data: {}[]) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    return (
        <div className="flex flex-wrap">
            {data.map(([_id, img1, img2, title, price, Tabs, code, videoId]: any, index: number) => (
                <Link to={`/disk/${_id}/detail`} key={index}>
                    <div
                        className="p-5 border-b border-gray-300 cursor-pointer w-[20rem] h-[20rem]"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div className="flex flex-col px-3 mr-2 border border-gray-200 h-[18rem]">
                            <img
                                src={classNames({
                                    [img1]: hoveredIndex !== index,
                                    [img2]: hoveredIndex === index
                                })}
                                alt="img1"
                                width={180}
                                height={80}
                                className="w-[20rem] h-[12rem] flex justify-center items-center"
                            />
                            <div className=" text-sm py-2 line-clamp-2">{title}</div>
                            <div className="text-sm font-bold py-2 text-red-600">{price} VND</div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ListDiskGameUtils
