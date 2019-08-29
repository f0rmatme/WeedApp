import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Card, Col, Row} from 'antd';

const Weeds = () => {

    //axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
    const [weed, setWeed] = useState([]);
    const [_error, setError] = useState([]);
    const { Meta } = Card;

    useEffect(() => {
        axios.get('http://localhost:3000/weed')
        .then(function (response) {
            
            console.log(response.data);
            setWeed(response.data);
        })
        .catch(function (error) {
            setError(error.data);
            console.log(error);
        });
    }, []);

    return (
        <React.Fragment>
            <Row gutter={16} style={{ marginTop : '25px', marginLeft : '12.5px', marginRight : '12.5px'}}>
            {
                weed.map((weedItem,key) => {
                    return (
                        <div key={key}>
                            <Col span={6} style={{ marginBottom: '25px'}}>
                                <Card 
                                    hoverable
                                    cover={<img alt="weed" src={weedItem.pictureUrl}/>}
                                >
                                    <Meta title={weedItem.weedName} description={weedItem.strain} />
                                    <br/>
                                    <p>THC: {weedItem.thc}</p>
                                    <p>CBD: {weedItem.cbd}</p>
                                    <p>BY: {weedItem.company}</p>
                                </Card>
                            </Col>
                        </div>
                    )
                })
            }
            </Row>
        </React.Fragment>
    );
}

export default Weeds