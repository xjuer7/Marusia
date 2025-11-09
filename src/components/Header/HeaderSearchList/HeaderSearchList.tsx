import { Link } from "react-router-dom";
import HeaderSearchCard from '../HeaderSearchCard/HeaderSearchCard.tsx'
import { useDispatch, useSelector } from "react-redux";
import { setInpValue, UISliceState } from "../../../store/UISlice.tsx";
import { Movies } from "../../../models/Movies.ts";
import { ListRefType } from "../HeaderInput/HeaderInput.tsx";


const HeaderSearchList = ({data, listRef, closeList} : {data: Movies | null, listRef:ListRefType, closeList: () => void}) => {
    const removeSelector = useSelector((state:UISliceState) => state.ui.isRemove)
    const dispatch = useDispatch()

    return (
        <ul ref={listRef}
                className={`header-search__list ${
                  removeSelector ? `header-search__list-close` : ``
                }`}
              >
                {!data ? (<div>Загрузка...</div>) : (
                  <>
                  {data?.length !== 0 ? (
                  <>
                    {data?.map((film) => (
                      <li key={film.id} className="header-search__list_item">
                        <Link
                          to={`/movie/${film.id}`}
                          onClick={() => {
                            closeList();
                            dispatch(setInpValue(''));
                          }}
                        >
                          <HeaderSearchCard data={film} />
                        </Link>
                      </li>
                    ))}
                  </>
                ) : (
                  <li className="header-search__notice">Ничего не найдено</li>
                )}
                </>
                )}
                
              </ul>
    )
}

export default HeaderSearchList