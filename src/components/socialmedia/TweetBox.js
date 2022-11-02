import React, { useState } from 'react'
import "./TweetBox.css"
import Box from "@mui/material/Box"
import ButtonUnstyled, { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled"
import { styled } from "@mui/system"
import { useSubstrateState } from './../../substrate-lib'
import { web3FromSource } from '@polkadot/extension-dapp'
import ipfs from '../../commons/ipfs'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'



const blue = {
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
}

const grey = {
  100: "#eaeef2",
  300: "#afb8c1",
  900: "#24292f",
}

const CustomButton = styled(ButtonUnstyled)(
  ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-weight: bold;
    font-size: 0.875rem;
    background-color: ${blue[500]};
    padding: 12px;
    border-radius: 12px;
    color: white;
    transition: all 150ms ease;
    float: left;
    cursor: pointer;
    border: none;
    box-shadow: 0px 4px 30px ${
      theme.palette.mode === "dark" ? grey[900] : grey[100]
    };
  
    &:hover {
      background-color: ${blue[600]};
    }
  
    &.${buttonUnstyledClasses.active} {
      background-color: ${blue[700]};
    }
  
    &.${buttonUnstyledClasses.focusVisible} {
      box-shadow: 0 3px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
      outline: none;
    }
  
    &.${buttonUnstyledClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
    `
)

function TweetBox() {
  const { api, currentAccount } = useSubstrateState()
  const [status, setStatus] = useState(null)
  const [unsubValue, setUnsub] = useState(null)
  const [eventstatus, setEventStatus] = useState(null)

  const getFromAcct = async () => {
    const {
      address,
      meta: { source, isInjected },
    } = currentAccount
  
    if (!isInjected) {
      return [currentAccount]
    }
  
    const injector = await web3FromSource(source)
    return [address, { signer: injector.signer }]
  }
  
  const txResHandler = (status, events, dispatchError, actions) => {
    actions.setSubmitting(true)
    if (dispatchError) {
      if (dispatchError.isModule) {
        // for module errors, we have the section indexed, lookup
        const decoded = api.registry.findMetaError(dispatchError.asModule)
        const { docs, name, section } = decoded
  
        console.log(`${section}.${name}: ${docs.join(' ')}`)
        setEventStatus(name)
        setStatus(null)
        actions.setSubmitting(false)
      } else {
        console.log(dispatchError.toString())
      }
    } else if (status.isFinalized) {
      setStatus(``)
      actions.resetForm()
      // setStatus(`😉 Finalized. Block hash: ${status.asFinalized.toString()}`)
      console.log('eventstatus', eventstatus)

  
      actions.setSubmitting(false)
    }
  }
  
  const txErrHandler = err =>
    setStatus(`😞 Transaction Failed: ${err.toString()}`)
  
  
  return (
    <div className="tweeetBox">
         <Formik
          initialValues={{
            post: '',
            image: '',
          }}
          validationSchema={Yup.object().shape({
            post: Yup.string().required('name is required'),
            image: Yup.string(),
          })}
          onSubmit={async (values, actions, resetForm ) => {
            try {
              const file = await ipfs.add({
                path: 'post.json',
                content: JSON.stringify(values),
              })
              const fromAcct = await getFromAcct()
              //   values.countvariable = count
              //   const data = await nearvar.contract. ...
              const opts = [file.cid.toString()]

              // const opts = ['Education', 'Bhadrak', 'whatapp']

              const txExecute = api.tx.posts.createPost(...opts)

              setStatus('Sending...')

              const unsub = await txExecute
                .signAndSend(
                  ...fromAcct,
                  ({ status, events, dispatchError }) => {
                    txResHandler(
                      status,
                      events,
                      dispatchError,
                      actions,
                    )
                  }
                )
                .catch(txErrHandler)

              setUnsub(() => unsub)

              // history.goBack()
            } catch (e) {
              console.error(e)
              // setErrorThrow(e.message)
            }
          }}
        >
          {({
            handleSubmit,
            handleBlur,
            handleChange,
            errors,
            touched,
            isValid,
            isSubmitting,
            values,
            setFieldValue,
            validateForm,
          }) => (
            <Form onSubmit={handleSubmit}>
              {status && <p>Status: {status}</p>}
        <div className="tweetBox__input">
        {touched.post && errors.post && (
            <p className="alert alert-danger">{errors.post}</p>
                )}
          <Field name="post" placeholder="Type your tweet" />
        </div>
        {/* <Field
          className="tweetBox__imageInput"
          name="image"
          placeholder="Optional: Enter image URL"
          type="text"
        /> */}
        <Box
          m={1}
          //margin
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          // sx={boxDefault}
        >
          <CustomButton type="submit"  disabled={isSubmitting}>Post it</CustomButton>
        </Box>
        </Form>
          )}
        </Formik>
    </div>
  )
}

export default TweetBox
