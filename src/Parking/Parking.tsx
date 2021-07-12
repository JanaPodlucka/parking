import React, { useEffect, useState, useRef, useCallback } from 'react'
import { FormattedMessage } from 'react-intl'

import Page from '../components/Page'
import Card from '../components/Card'
import CardContainer from '../components/CardContainer'
import ErrorMessage from '../components/ErrorMessage'
import Modal from '../components/Modal'

import ParkingDetail from './ParkingDetail'
import messages from './messages'

const BLOCK_NAME = 'parking'

type GeometryType = {
  type: string,
  coordinates: Array<Array<Array<number>>>,
}

type PropertiesType = {
  id: string,
  name: string,
  category: string,
  total_spot_number: number,
}

export type ParkingType = {
  geometry: GeometryType,
  properties: PropertiesType,
}

const Parking = () => {
  const [loaded, setLoaded] = useState<Boolean>(false)
  const [error, setError] = useState<Boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const [items, setItems] = useState<Array<ParkingType> | undefined>(undefined)
  const [apiKey, setApiKey] = useState<string>('')
  const [showModal, setShowModal] = useState<Boolean>(false)
  const [detailId, setDetailId] = useState<string | undefined>(undefined)

  const refContainer = useRef<HTMLDivElement | undefined>(undefined)

  // Handle close detail modal and reset detail id
  const handleCloseModal = useCallback(() => {
    setShowModal(false)
    setDetailId(undefined)
  }, [])

  // Handle load data
  const handleLoadData = (key: string) => {
    const api = key
      ? 'https://api.golemio.cz/v2/parking/'
      : 'https://private-anon-d5150e7644-golemioapi.apiary-mock.com/v2/parking/'

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
            setItems(undefined)
          }
          else {
            setError(false)
            setErrorMessage('')
            setLoaded(true)
            setItems(response.features)
          }
        })
      .catch(
        error => {
          setError(true)
          setLoaded(false)
          setItems(undefined)
        }
      )
  }

  // Load data on component did mount (no api key)
  useEffect(() => {
    handleLoadData('')
  }, [])

  // Close modal on click outside modal
  useEffect(() => {
    const handleWindowClick = (event: MouseEvent): void => {
      const refContainTarget = refContainer.current && refContainer?.current?.contains(event.target as Node)

      if (refContainTarget) {
        return
      }

      if (!showModal) {
        return
      }

      handleCloseModal()
    }

    if (showModal) {
      window.addEventListener('click', handleWindowClick)
    }

    return () => {
      if (showModal) {
        window.removeEventListener('click', handleWindowClick)
      }
    }
  }, [showModal, handleCloseModal])

  // Load data with user's input
  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault()
    handleLoadData(apiKey)
    setApiKey('')
  }

  // Handle change of api key input
  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setApiKey(event.currentTarget.value)
  }

  // Open modal with id of parking spot
  const handleShowModal = (id: string): void => {
    setShowModal(true)
    setDetailId(id)
  }

  // Close modal on Escape key press
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      handleCloseModal()
    }
  })

  const loading = !error && !loaded

  return (
    <Page
      header={<FormattedMessage {...messages.header} />}
      footer={
        <form onSubmit={handleSubmit} className={`${BLOCK_NAME}__form`}>
          <label htmlFor="apiKey" className={`${BLOCK_NAME}__label_api-key`}>
            <FormattedMessage {...messages.apiKey} />
          </label>
          <input
            type='text'
            id='apiKey'
            name='apiKey'
            value={apiKey}
            onChange={handleChange}
            className={`${BLOCK_NAME}__input_api-key`}
          />
          <button type='submit' disabled={loading} className={`${BLOCK_NAME}__button`} >
            <FormattedMessage {...messages.submitButton} />
          </button>
        </form>
      }
    >
      {loading && <FormattedMessage {...messages.loading} />}
      {error && <ErrorMessage errorMessage={errorMessage} />}

      {loaded && Array.isArray(items) && items.length > 0 && (
        <CardContainer>
          {items.map(item => {
            return (
              <button
                onClick={() => handleShowModal(item.properties.id)}
                className={`${BLOCK_NAME}__card`}
                key={item.properties.id}
              >
                <Card>
                  <span className={`${BLOCK_NAME}__name`}>{item.properties.name}</span>
                </Card>
              </button>
            )
          })}
        </CardContainer>
      )}
      {/* Show modal */}
      {showModal && detailId && (
        <Modal
          onClose={handleCloseModal}
          header={(
            <div className={`${BLOCK_NAME}__header`}>
              <FormattedMessage {...messages.detail} />
            </div>
          )}
          ref={refContainer}
        >
          <ParkingDetail id={detailId} key={apiKey} />
        </Modal>
      )}
    </Page>
  )
}

export default Parking