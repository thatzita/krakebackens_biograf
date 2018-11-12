import React from 'react'
import { Segment, Input, Breadcrumb, Table, Header, Image, Icon } from 'semantic-ui-react'

const movieItems = [
    {
    key: 1, 
    value: 'sagan om ringen',
    header: 'sagan om ringen',  
    image: 'http://image.tmdb.org/t/p/original/9gERd6wVsQFdaLCzGNPlpAvFPv8.jpg', 
   
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam rutrum placerat vehicula. Nulla felis metus, tempor sit amet odio tempus, placerat euismod augue. Aenean lacinia elementum lacinia. Sed sed auctor felis, a rhoncus nibh. Vestibulum aliquam eu lorem ut porttitor. '

},
{
    key: 2, 
    value: 'sagan om ringen',
    header: 'sagan om ringen',  
    image: 'http://image.tmdb.org/t/p/original/9gERd6wVsQFdaLCzGNPlpAvFPv8.jpg', 
  
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam rutrum placerat vehicula. Nulla felis metus, tempor sit amet odio tempus, placerat euismod augue. Aenean lacinia elementum lacinia. Sed sed auctor felis, a rhoncus nibh. Vestibulum aliquam eu lorem ut porttitor. '
},


]

// const BreadcrumbMenu = () => (
//     <Breadcrumb>
//       <Breadcrumb.Section link>Film</Breadcrumb.Section>
//       <Breadcrumb.Divider icon='right angle' />
//       <Breadcrumb.Section link>Datum och Tid</Breadcrumb.Section>
//       <Breadcrumb.Divider icon='right angle' />
//       <Breadcrumb.Section active>Preview</Breadcrumb.Section>
//     </Breadcrumb>
//   );

const MonMovieForm = () => (
<React.Fragment>
<Segment>
    <Header as='h2' dividing>
        <Icon name='film' />
        <Header.Content>
        Välj en film
        </Header.Content>
    </Header>
    
    <Input fluid size='big' icon='search' placeholder='Sök och välj film...'/>
    <Segment style={{overflow: 'auto', height:'70vh', maxHeight:'70vh', border: '0', boxShadow:'none', padding:'0'}}>
    <Table selectable basic>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Filmer</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {movieItems.map(item => (
            <Table.Row key={item.key}>
            <Table.Cell>
                <Image size='tiny' src={item.image} />
            </Table.Cell>
            <Table.Cell>
                <Header>
                    <Header.Content>
                        {item.header} (2005)
                        <p style={{fontSize:'0.9rem'}}><Icon name='clock outline' color='grey'/> <em>1h 28min</em></p>
                        <Header.Subheader style={{maxWidth:'50%'}}>{item.content}</Header.Subheader>
                    </Header.Content>
                </Header>
            </Table.Cell>
            </Table.Row>)
            )}
        </Table.Body>
    </Table>
    </Segment>
</Segment>
</React.Fragment>
);

export default MonMovieForm;
