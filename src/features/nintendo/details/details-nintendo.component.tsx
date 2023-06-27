import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { RootState } from '../../../app/store'
import { useParams, useNavigate } from 'react-router-dom'
import {
    getAllCartShopThink,
    getDetailNintendoThunk,
    postCartShopThunk,
    putCartShopThunk
} from '../../../reducer/thunk.api'
import { ICartShop } from '../../../model'
import { setDown, setUp } from '../../../reducer/cartshop.reducer'
import { PathConstant } from '../../../constant/path.constant'

const DetailsNintendoComponent = () => {
    const nintendoDetail = useAppSelector((state: RootState) => state.nintendo.detailNintendo)
    const AllCartShop = useAppSelector((state: RootState) => state.cartShop.dataCardShop)
    const loading = useAppSelector((state: RootState) => state.nintendo.loading)
    const count = useAppSelector((state: RootState) => state.cartShop.numberType)
    const error = useAppSelector((state: RootState) => state.nintendo.error)
    const dispatch = useAppDispatch()
    const [duplicateCount, setDuplicateCount] = useState(0)
    const isAuth = useAppSelector((state: RootState) => state.user.isAuth)

    const { key } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const CallApi = async () => {
            await dispatch(getDetailNintendoThunk(key as string))
        }
        CallApi()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>error: {error}</div>
    }
    const handleCartShop = async (event: ICartShop) => {
        if (isAuth) {
            const { _id, ...newEvent } = event

            const isDuplicate = AllCartShop.some((f) => {
                return f.title === newEvent.title
            })

            if (isDuplicate) {
                const duplicateItem = AllCartShop.find((f) => f.title === newEvent.title)
                const updatedSL = parseInt(newEvent.SL) + duplicateCount + 1
                setDuplicateCount((prevCount) => prevCount + 1)
                newEvent.SL = updatedSL.toString()
                await dispatch(putCartShopThunk({ id: duplicateItem?._id as string, body: newEvent as ICartShop }))
            } else {
                await dispatch(postCartShopThunk(newEvent as ICartShop))
            }
            await dispatch(getAllCartShopThink())
        } else {
            navigate(PathConstant.user.login)
        }
    }

    return (
        <div className="flex flex-row p-4">
            <div className="w-1/2 ">
                <div className="fixed top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                    <img src={nintendoDetail.img1} alt="img1" className="w-[32rem] h-[35rem] object-cover " />
                </div>
            </div>
            <div className="w-1/2 px-2 py-3 flex flex-col">
                <div className="font-bold text-2xl pt-2">{nintendoDetail.title}</div>
                <div className="flex flex-row gap-2 pt-2">
                    <p className="font-bold ">Mã sản phẩm:</p>
                    <p className="">{nintendoDetail.code}</p>
                </div>
                <div className="pt-2">
                    <p className="text-red-600 text-2xl font-bold">{nintendoDetail.price} VND</p>
                </div>
                <div className="pt-2 flex flex-row">
                    <div className="flex flex-row mr-2">
                        <button
                            className="px-5 py-2 flex justify-center items-center bg-gray-300"
                            onClick={() => dispatch(setDown())}
                        >
                            -
                        </button>
                        <div className="px-5 py-2 flex justify-center items-center bg-white">{count}</div>
                        <button
                            className="px-5 py-2 flex justify-center items-center bg-gray-300"
                            onClick={() => dispatch(setUp())}
                        >
                            +
                        </button>
                    </div>
                    <div className="flex-1 flex justify-center  items-center ring ring-red-300 hover:ring-red-700  active:bg-red-600">
                        <button
                            className="font-bold text-red-600 w-full"
                            onClick={() =>
                                handleCartShop({
                                    _id: '',
                                    img1: nintendoDetail.img1,
                                    price: nintendoDetail.price,
                                    title: nintendoDetail.title,
                                    SL: String(count)
                                })
                            }
                        >
                            THÊM VÀO GIỎ
                        </button>
                    </div>
                </div>
                <div className="flex py-3">
                    <div className="w-1/2 flex flex-col">
                        <div className="flex flex-row py-2">
                            <img
                                src="https://file.hstatic.net/1000397797/file/delivery-ico1_f26631929e1b41dab022d9960006297c.svg"
                                alt="icon1"
                            />
                            <div className="flex-1 px-2">
                                <p>Hàng chất lượng cao</p>
                            </div>
                        </div>
                        <div className="flex flex-row py-2">
                            <img
                                src="https://file.hstatic.net/1000397797/file/delivery-ico2_5ea2de2f279b4dbfa10fcb9b9c448b4d.svg"
                                alt="icon2"
                            />
                            <div className="flex-1 px-2">
                                <p>Vận chuyển toàn quốc</p>
                            </div>
                        </div>
                        <div className="flex flex-row py-2">
                            <img
                                src="https://file.hstatic.net/1000231532/file/mastercard_visa_nshop_b52d53ac69a545b2a8fd4d3f190374cc.png"
                                alt="icon3"
                                className="h-[1.5rem] w-[1.5rem]"
                            />
                            <div className="flex-1 px-2">
                                <p>Miễn phí cà thẻ</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="flex flex-row py-2">
                            <img
                                src="https://file.hstatic.net/1000231532/file/mastercard_visa_nshop_b52d53ac69a545b2a8fd4d3f190374cc.png"
                                alt="icon3"
                                className="h-[1.5rem] w-[1.5rem]"
                            />
                            <div className="flex-1 px-2">
                                <p>Nintendo Switch</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="font-bold text-2xl pt-2">THÔNG TIN SẢN PHẨM</div>
                    <div className="pt-2">{nintendoDetail.des}</div>
                    <div className="flex justify-center items-center mt-3 font-bold text-xl text-orange-500">
                        NINTENDO SWITCH OLED MODEL THE LEGEND OF ZELDA TEARS OF THE KINGDOM EDITION ĐẸP RỰC RỠ VÀ TỐT
                        HƠN
                    </div>
                    <img src={nintendoDetail.img2} alt="img2" className="w-[38rem] h-[35rem] object-cover pt-2" />
                    <p className="py-3">
                        Giá rẻ đảm bảo luôn có hàng, không yêu cầu điều kiện: Khác với những cửa hàng khác chỉ quảng cáo
                        để lôi khách về cửa hàng. Tại nShop những gì bạn đọc là những gì bạn có thể thấy tại nShop. Giá
                        đăng là giá bán, không bắt buộc phải mua kèm với game hay phụ kiện khác mới bán.
                    </p>
                    <p className="py-3">
                        Không tính các phí cà thẻ (ATM, VISA, Master Card...) gây phiền phức cho khách.
                    </p>
                    <p className="py-3">
                        Không loại bỏ yếu tố bảo hành để giảm chi phí nhưng thiệt hại về sau cho khách.
                    </p>
                    <p className="py-3">
                        Miễn phí tạo Nintendo Account tải game miễn phí cực hay trên Nintendo Switch, hướng dẫn tận tình
                        cho khách sử dụng từ A-Z
                    </p>
                    <img src={nintendoDetail.img3} alt="img2" className="w-[38rem] h-[35rem] object-cover pt-2" />
                </div>
            </div>
        </div>
    )
}

export default DetailsNintendoComponent
