import classNames from 'classnames'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const ListNintendoArrayUtils = (data: {}[]) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    return (
        <div>
            {data.map(
                (
                    [
                        _id,
                        title,
                        version,
                        BH,
                        colorJoyCon,
                        screen,
                        data,
                        Pin,
                        price,
                        code,
                        des,
                        img1,
                        img2,
                        img3,
                        img4
                    ]: any,
                    index: number
                ) => (
                    <Link to={`/nintendo/${_id}/detail`}>
                        <div
                            key={index}
                            className="p-5 border-b border-gray-300 cursor-pointer"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="flex flex-row">
                                <div className="flex px-3 mr-2">
                                    <img
                                        src={classNames({
                                            [img1]: hoveredIndex !== index,
                                            [img2]: hoveredIndex === index
                                        })}
                                        alt="img1"
                                        width={180}
                                        height={80}
                                    />
                                </div>
                                <div className="flex flex-col ">
                                    <div className="font-bold text-lg py-2">{title}</div>
                                    <div className="text-sm font-bold py-2 text-red-600">{price} VND</div>
                                    <table className="px-4">
                                        <thead></thead>
                                        <tbody>
                                            <tr>
                                                <th className="text-left">Phiển bản:</th>
                                                <td>{version}</td>
                                            </tr>
                                            <tr>
                                                <th className="text-left">Bảo hành:</th>
                                                <td>{BH}</td>
                                            </tr>
                                            <tr>
                                                <th className="text-left">Màu sắc Joy-con:</th>
                                                <td>{colorJoyCon}</td>
                                            </tr>
                                            <tr>
                                                <th className="text-left">Màn hình:</th>
                                                <td>{screen}</td>
                                            </tr>
                                            <tr>
                                                <th className="text-left">Bộ nhớ:</th>
                                                <td>{data}</td>
                                            </tr>
                                            <tr>
                                                <th className="text-left">Pin</th>
                                                <td>{Pin}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            )}
        </div>
    )
}

export default ListNintendoArrayUtils
