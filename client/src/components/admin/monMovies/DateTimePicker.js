import React from 'react'
import { Segment, Header, Icon, Form} from 'semantic-ui-react'
// import { Link } from "react-router-dom";


export default function DateTimePicker(props) {
  return (
    <Segment>
        <Header as='h2' dividing>
            <Icon name='calendar alternate outline' />
            <Header.Content>
                Välj datum och tid för filmvisning
            </Header.Content>
        </Header>

        <Form>
            <Form.Group>
                <Form.Input
                    size='big'
                    style={{color:'#470877'}}
                    icon='calendar alternate outline'
                    iconPosition='left'
                    type='date'
                    name='date'
                    id='form-input-date'
                    label='Datum'
                    onChange={props.handleTimeChange}
                    value={props.date}
                />
                <Form.Input
                    size='big'
                    style={{ color:'#470877', paddingRight:'2rem'}}
                    icon='time'
                    iconPosition='left'
                    type='time'
                    name='time'
                    id='form-input-time'
                    label='Tid'
                    onChange={props.handleTimeChange}
                    value={props.time}
                />
                <Form.Button
                    onClick={() => props.goToOrLeavePreviewPage(true)}
                    disabled={props.time <= 0 || props.date <= 0 || props.movieId <=0 || (Object.keys(props.eventObject).length === 0  && props.eventObject.constructor === Object)} 
                    primary 
                    icon 
                    labelPosition='right' 
                    style={{marginTop:'24px'}} 
                    size='big' >
                        Gå Vidare till Preview
                        <Icon name='right angle' />
                </Form.Button>
            </Form.Group>
        </Form>
    </Segment>
  )
}
