import React, { useState } from 'react'
import { Input, message, List, Button } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GetUsersApi } from '../../../request/api';
import { connect } from 'react-redux'


const { Search } = Input;



function Users(props) {
  // const [username, setUsername] = useState([])


  const onSearch = value => {
    GetUsersApi(value).then(res => {
      message.success('查询成功')
      // setUsername(res.data)
      console.log(res.data)
      props.search(res.data)
    })
  }

  const showDetail = (item) => {
    props.history.push({ pathname: '/detail', state: { info: item.full_name } })
  }

  // console.log(props)

  return (
    <div>
      <Search
        placeholder="Github username"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <div
        id="scrollableDiv"
        style={{
          height: 300,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
      >
        <InfiniteScroll
          dataLength={props.arr.length}
          style={{ display: 'flex', flexDirection: 'column-reverse' }}
          inverse={true}
          hasMore={true}
          scrollableTarget="scrollableDiv"
        >
          <List
            itemLayout="horizontal"
            dataSource={props.arr}

            renderItem={(item) => (
              <List.Item >
                {item.name}
                {<Button
                  type="primary"
                  onClick={() => showDetail(item)}
                  style={{ float: 'right' }}
                >查看详情</Button>}
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  )
}

const mapStateToProps = ({ dataReducer: { arr } }) => {
  return {
    arr
  }
}

const mapDispatchToProps = {
  search(data) {
    return {
      type: 'search',
      data
    };
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
// export default Users