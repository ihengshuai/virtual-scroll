import React, { useState, useRef, useEffect } from 'react'
import "./index.css"

import { imgs as mockImgs, throttle } from "../../util"
import { fetchData } from "../../api"

const sourceList = []
for(let i = 0; i < 10000; i++) {
  sourceList.push({
    img: mockImgs[Math.floor(Math.random() * mockImgs.length)],
    name: i === 99 ? '最后一个...' : Math.floor(Math.random() * 999999).toString(2) + '----' + i,
    key: i,
  })
}

const dataList = []
let page = 0, limit = 10, done = false

function FixedExample(props) {
  const { itemHeight = 100 } = props
  const { fixedHeight = '100vh' } = props
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(10)
  const [forceUpdate, setForceUpdate] = useState(false)
  const [waiting, setWaiting] = useState(false)

  const scroller = useRef(null)
  const scroll = async () => {
    const fixedElmHeight = scroller.current.offsetHeight
    const scrollHeight = scroller.current.scrollTop

    if(dataList.length * itemHeight - scrollHeight - fixedElmHeight <= 200 && !waiting) {
      if(done) return
      setWaiting(true)
      fetchData(200, false).then(() => {
        console.log('fetch success')
        const fetched = sourceList.slice(page * limit, (page + 1) * limit)
        if(!fetched.length) {
          setWaiting(false)
          done = true
          return
        }
        dataList.push(...fetched)
        page ++
        setWaiting(false)
        setForceUpdate(!forceUpdate)
      }).catch(() => {
        console.log('fetch error')
        if(!dataList.length) {
          requestAnimationFrame(scroll)
        }
        scroller.current.classList.toggle('hidden')
        setWaiting(false)
      })
      return
    }
    const limitPageHeight = Math.max(fixedElmHeight, itemHeight * limit)
    const currentStartIndex = Math.floor(scrollHeight / itemHeight)
    const currentEndIndex = currentStartIndex + Math.ceil(limitPageHeight / itemHeight)
    if(currentStartIndex === startIndex && currentEndIndex === endIndex) return
    requestAnimationFrame(() => {
      setStartIndex(currentStartIndex)
      setEndIndex(currentEndIndex)
    })
  }

  useEffect(() => {
    scroll()
  })

  const clickItem = (item) => {
    console.log(item)
  }

  return (
    <div
      ref={scroller}
      onScroll={throttle(scroll, 100)}
      className={"main"}
      style={{height: fixedHeight, position: "relative"}}
    >
      <div
        className="wrap"
        style={{
          position: 'relative',
          height: itemHeight * dataList.length + 'px'
        }}
      >
        {
          dataList
            .slice(startIndex, endIndex)
            .map((item, index) =>
              <div
                className={"item"}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  transform: `translateY(${(startIndex + index) * itemHeight}px)`
                }}
                key={item.key}
                onClick={() => clickItem(item)}
              >
                <img src={item.img} alt={item.name} />
                <div>{item.name}</div>
              </div>
            )
        }
        { waiting ? <div className={"loading"}><img src="/loading.gif" alt="" /><div>正在加载...</div></div> : null }
        
      </div>
    </div>
  );
}

export default FixedExample
