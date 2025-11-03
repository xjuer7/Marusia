import { Link } from "react-router-dom";
import HeaderSearchCard from '../HeaderSearchCard/HeaderSearchCard'
import { useDispatch, useSelector } from "react-redux";
import { setInpValue } from "../../../store/UISlice";


const HeaderSearchList = ({data, listRef, closeList}) => {
    const removeSelector = useSelector((state) => state.ui.isRemove)
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