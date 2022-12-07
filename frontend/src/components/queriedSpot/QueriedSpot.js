import { useEffect  } from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { searchSpotThunk } from '../../store/queriedSpot'
import SpotCard from '../Spots/SpotCard';
import '../../index.css'

const QueriedSpot = () => {
  const dispatch = useDispatch();

  const queriedSpot = useSelector(state => (state.querySpot))
  const queriedSpotArr = Object.values(queriedSpot)
  const search = useLocation().search;
  const query = new URLSearchParams(search).get("name");

  const url = useLocation().search


  useEffect(() => {
    dispatch(searchSpotThunk(url.split("=")[1]))
  }, [dispatch, url])

  let queriedResults;

  if (queriedSpotArr.length === 0) {
    queriedResults = (
      <div>
      <div className='queriedspots-header'>
      {queriedSpotArr.length} Spot found for "{query}"
      </div>
    <div className='all-spots-container'>
      <div className='queriedspots-results'>
      </div>
    </div>
    </div>
    )
  } else if (queriedSpotArr.length === 1) {
    queriedResults = (
      <div>
        <div className='queriedspots-header'>
        {queriedSpotArr.length} Spot found for "{query}"
        </div>
      <div className='all-spots-container'>
        <div className='queriedspots-results'>
          <div className='queriedspots-header'>
          </div>
        </div>
          {queriedSpotArr.map((spot) => (
            <div className='all-spots-card-container' key={spot}>
                <SpotCard spot={spot}/>
            </div>
          ))}
      </div>
      </div>
    )
  } else if (queriedSpotArr.length > 1) {
    queriedResults = (
      <div>
        <div className='queriedspots-header'>
        {queriedSpotArr.length} Spots found for "{query}"
          </div>
    <div className='all-spots-container'>
      <div className='queriedspots-results'>
      </div>
        {queriedSpotArr.map((spot) => (
          <div className='all-spots-card-container'>
            <SpotCard spot={spot}/>
          </div>
        ))}
    </div>
    </div>
    )
  }

  return (
    <div>
      {queriedResults}
    </div>
  )
}

export default QueriedSpot;
