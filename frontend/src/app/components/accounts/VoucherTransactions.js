import React, { Component } from 'react'
import {Query} from 'react-admin'

export const OwnersInput = ({
    label,
    source,
    reference,
    optionValue,
    user = {},
    formName = ''
 }) => {
    const {name: defaultUser} = user
    const {email: defaultEmail} = user
 
    return (<Query type={GET_LIST} resource={reference} payload={ownersPayload}>
            {({data}) => {
                return (data && (<div>
                            <AutocompleteInput
                                translateChoice={false}
                                choices={data}
                                allowEmpty
                                label={label}
                                optionValue={optionValue}
                                source={source}
                                validate={validateOwner}
                                defaultValue={defaultUser}
                            />
                            <FormDataConsumer>
                                {({formData, dispatch}) => {
                                    const email = getEmail(
                                        formData,
                                        data,
                                        defaultEmail
                                    )
                                    if (
                                        formData &&
                                        formData.owner_email !== email
                                    ) {
                                        console.log('CHANGING EMAIL')
                                        dispatch(
                                            change(
                                                formName,
                                                'owner_email',
                                                email
                                            )
                                        )
                                    }
                                    return (
                                        <TextInput
                                            source="owner_email"
                                            label="email"
                                            defaultValue={defaultEmail}
                                            disabled
                                            style={layout}
                                        />
                                    )
                                }}
                            </FormDataConsumer>
                        <div/>)
                )
            }}
        </Query>
    )
 }

export class VoucherTransactions extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default VoucherTransactions
