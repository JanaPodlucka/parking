import React, { useState, useEffect, useCallback } from 'react'
import { FormattedMessage } from 'react-intl'

import ErrorMessage from '../components/ErrorMessage'

import { ParkingType } from './Parking'
import messages from './messages'

const BLOCK_NAME = 'parking-detail'

interface Props {
  id: string,
  key: string,
}

const ParkingDetail = ({ id, key } : Props) => {

  const [loaded, setLoaded] = useState<Boolean>(false)
  const [error, setError] = useState<Boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const [detail, setDetail] = useState<ParkingType | undefined>(undefined)

  // Handle load data
  const handleLoadData = useCallback(() => {
    const api = key
      ? `https://api.golemio.cz/v2/parking/${id}`
      : `https://private-anon-d5150e7644-golemioapi.apiary-mock.com/v2/parking/${id}`

      const requestHeaders: HeadersInit = new Headers()
      requestHeaders.set('Content-Type', 'application/json')
      if (key) {
        requestHeaders.set('x-access-token', key)
      }

    fetch(api, {
      method: 'GET',
      headers: requestHeaders,
    })
      .then(res => res.json())
      .then(
        response => {

          if (response?.error_status) {
            setError(true)
            setErrorMessage(response?.error_message)
            setLoaded(false)
            setDetail(undefined)
          }
          else {
            setError(false)
            setErrorMessage('')
            setLoaded(true)
            setDetail(response)
          }
        })
      .catch(
        error => {
          setError(true)
          setLoaded(false)
          setDetail(undefined)
        }
      )
  }, [id, key])


  // Load detail on component did mount
  useEffect(() => {
    handleLoadData()
  }, [handleLoadData])

  const loading = !error && !loaded

  return (
    <div className={BLOCK_NAME}>
      {loading && <FormattedMessage {...messages.loading} />}
      {error && <ErrorMessage errorMessage={errorMessage} />}
      {loaded && detail && (
        <>
          <div className={`${BLOCK_NAME}__property`}>
            <div className={`${BLOCK_NAME}__property_label`}>
              <FormattedMessage {...messages.name} />
            </div>
            <div>{detail.properties.name}</div>
          </div>
          <div className={`${BLOCK_NAME}__property`}>
            <div className={`${BLOCK_NAME}__property_label`}>
              <FormattedMessage {...messages.category} />
            </div>
            <div>{detail.properties.category}</div>
          </div>
          <div className={`${BLOCK_NAME}__property`}>
            <div className={`${BLOCK_NAME}__property_label`}>
              <FormattedMessage {...messages.totalSpotNumber} />
            </div>
            <div>{detail.properties.total_spot_number}</div>
          </div>
        </>
      )}
    </div>
  )
}

export default ParkingDetail