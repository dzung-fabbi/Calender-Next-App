import {
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import * as React from 'react'
import { twMerge } from 'tailwind-merge'

import homeApi from '@/api/home.api'
import { Button } from '@/components/button'
import { IconDown } from '@/components/icon'
import { ModalInformation } from '@/components/modal'
import { useToggle } from '@/hooks'
import { useStore } from '@/store/useStore'
import {
  cungSon,
  MONTH_CAN_CHI,
  SAO_LUNAR,
  SAO_TIETKHI,
} from '@/utils/constant'
import {
  getBgColorCan,
  getBgColorCung,
  getCanChi,
  getDayName,
  getLunarDate,
  getSolarDate,
  isBrowser,
  jsUcfirst,
  removeZero,
} from '@/utils/helpers'

const months = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
]

function formatSao(array: any) {
  return array.reduce(
    (accumulator: any, currentValue: any) => {
      let value = { ...accumulator }
      if (
        currentValue.sao.category &&
        currentValue.sao.category.name in value
      ) {
        value = {
          ...value,
          [currentValue.sao.category.name]: [
            ...value[currentValue.sao.category.name],
            currentValue.sao,
          ],
        }
      } else if (currentValue.sao.category) {
        value = {
          ...value,
          [currentValue.sao.category.name]: [currentValue.sao],
        }
      } else {
        value = {
          ...value,
          default: [...value.default, currentValue.sao],
        }
      }
      return value
    },
    { default: [] }
  )
}

function convertFromSolar(day: any, month: any, year: any) {
  const value = getSolarDate(removeZero(day), removeZero(month), +year)
  const currentLunar = getLunarDate(+value[0], +value[1], +value[2])
  const canChi: any = getCanChi(currentLunar)

  return MONTH_CAN_CHI[canChi[1].split(' ')[1]]
}

function ThanSat() {
  const currentDate = useStore((state) => state.currentDate)
  const day = currentDate.format('DD')
  const month = currentDate.format('MM')
  const year = currentDate.format('YYYY')
  const convertSolar = getSolarDate(removeZero(day), removeZero(month), +year)
  const currentLunarDate = getLunarDate(
    +convertSolar[0],
    +convertSolar[1],
    +convertSolar[2]
  )
  const dayName = getDayName(currentLunarDate)
  const [thansatByYear, setThansatByYear] = useState<any>([])
  const [isOpen, toggleModal] = useToggle()
  const onChangeCurrentDate = useStore((state) => state.setCurrentDate)
  const [monthSelect, setMonth] = useState<string>('')
  const [yearSelect, setYear] = useState<string>(currentDate.format('YYYY'))
  const [chooseStars, setChooseStars] = useState<{
    name: string
    data: string
  }>({
    name: '',
    data: '',
  })

  const [cungSelect, setCungSelect] = useState<any>({
    name: 'Ly',
    direction: 'Nam',
    coordinates: '157,5',
    backgroundColor: 'rgb(239 68 68 / 1)',
    color: 'black',
    son: [
      {
        name: 'Bính',
        coordinates: '157,5',
        backgroundColor: 'rgb(239 68 68 / 1)',
        color: 'black',
      },
      {
        name: 'Ngọ',
        coordinates: '172,5',
        backgroundColor: 'rgb(239 68 68 / 1)',
        color: 'black',
      },
      {
        name: 'Đinh',
        coordinates: '187,5',
        backgroundColor: 'rgb(239 68 68 / 1)',
        color: 'black',
      },
    ],
  })
  const [isTrungCung, setIsTrungCung] = useState<boolean>(false)
  const [config, setConfig] = useState<any>({
    direction_config: {
      good: 1,
    },
  })

  useEffect(() => {
    ;(async () => {
      await homeApi
        .getConfig()
        .then((res) => {
          setConfig(res.data)
        })
        .catch(() => {})
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        const responseData = await homeApi.getThanSatInfo(dayName[2] || '')
        if (monthSelect) {
          const data: any = responseData.than_sat_by_month
          const dataLunar = data[`month_${monthSelect}`].filter(
            (el: any) => el.sao.calendar === SAO_LUNAR
          )
          const arrayMonths = convertFromSolar(day, month, year)
          const dataTietkhi1 = data[`month_${arrayMonths[0]}`].filter(
            (el: any) => el.sao.calendar === SAO_TIETKHI
          )
          const dataTietkhi2 = data[`month_${arrayMonths[1]}`].filter(
            (el: any) => el.sao.calendar === SAO_TIETKHI
          )

          setThansatByYear([...dataLunar, ...dataTietkhi1, ...dataTietkhi2])
        } else {
          setThansatByYear(responseData.than_sat_by_year?.than_sat_sao)
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    })()
  }, [currentDate])

  const handleClickStars = (el: { name: string; property: string }) => {
    setChooseStars({
      name: el?.name || '',
      data: el?.property || '',
    })
    toggleModal()
  }

  function scrollToBottom() {
    if (!isBrowser()) return
    window.scrollTo({ top: 500, behavior: 'smooth' })
  }

  const chooseCung = (cung: string, son: string) => {
    const tmp = cungSon.find((el: any) => el.name === cung)
    const cungNew = { ...tmp }
    if (son && cungNew) {
      // @ts-ignore
      const tmp1 = cungNew.son.filter((x: any) => x.name === son)
      cungNew.son = tmp1
      setCungSelect(cungNew)
    } else {
      setCungSelect(tmp)
    }
    setIsTrungCung(false)
    scrollToBottom()
  }

  const chooseCungTrung = () => {
    setIsTrungCung(true)
  }

  const getLabelGoodUgly = (arr: any) => {
    let totalPointGood = 0
    let totalPointUgly = 0
    let numberUgly = 0
    let numberGood = 0
    arr.map((el: any) => {
      let { level } = el.sao
      if (el.sao.level_year) level = el.sao.level_year
      if (monthSelect && el.sao.level_month) level = el.sao.level_month
      if (el.sao.good_ugly_stars === 1) totalPointGood += level * el.sao.point
      if (el.sao.good_ugly_stars === 2) totalPointUgly += level * el.sao.point
      const nameStars = el.sao.name
      if (nameStars.toLowerCase().split(' ').includes('đức')) numberGood += 1
      if (nameStars.toLowerCase().split(' ').includes('sát')) numberUgly += 1
      return el
    })
    console.log('totalPointGood', totalPointGood)
    console.log('totalPointUgly', totalPointUgly)

    if (totalPointGood && !totalPointUgly) {
      return 'Tốt'
    }

    if (!totalPointGood && totalPointUgly) {
      return 'Xấu'
    }

    if (totalPointGood && totalPointUgly) {
      if (totalPointGood / totalPointUgly > config.direction_config.value) {
        return 'Tốt'
      }

      if (totalPointGood / totalPointUgly < config.direction_config.value) {
        return 'Xấu'
      }

      if (numberGood > numberUgly) {
        return 'Tốt'
      }

      if (numberGood < numberUgly) {
        return 'Xấu'
      }
    }
    return ''
  }

  const renderThansatByYear = () => {
    let saoCung = thansatByYear.filter(
      (x: any) => x.direction === cungSelect.name && x.sao.is_mountain === 1
    )

    if (isTrungCung) {
      saoCung = thansatByYear.filter((x: any) =>
        ['Trung'].includes(x.direction)
      )
    }

    let objSaoMau = thansatByYear.filter((x: any) =>
      ['Mậu'].includes(x.direction)
    )

    let objSaoKy = thansatByYear.filter((x: any) =>
      ['Kỷ'].includes(x.direction)
    )

    const labelCung = getLabelGoodUgly(saoCung)
    const objSao = formatSao(saoCung)
    objSaoMau = formatSao(objSaoMau)
    objSaoKy = formatSao(objSaoKy)

    return (
      <TableContainer component={Paper}>
        <Table aria-label="am phu thai tue">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={6}>
                {monthSelect ? `${month}/${year}` : `Năm ${year}`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                width="50%"
                align="center"
                colSpan={6}
                style={{
                  backgroundColor: cungSelect.backgroundColor,
                  color: cungSelect.color,
                  fontWeight: 'bold',
                }}
              >
                {isTrungCung ? 'Trung Cung' : cungSelect.name}{' '}
                <span>{labelCung}</span>
              </TableCell>
            </TableRow>
          </TableHead>
          {isTrungCung && (
            <TableBody>
              <TableRow>
                <TableCell width="25%" align="center" colSpan={6}>
                  {Object.keys(objSao).map((cat: string, index: number) => {
                    return (
                      <div className="block text-center" key={index}>
                        {cat === 'default' ? '' : `${cat}: `}
                        {objSao[cat].map((x: any, idx: number) => {
                          const className =
                            x.good_ugly_stars === 1
                              ? 'text-red-tag text-red-primary text-primary'
                              : ''
                          return (
                            <>
                              <span
                                className={`cursor-pointer  ${className}`}
                                onClick={() => handleClickStars(x)}
                              >
                                &nbsp;{jsUcfirst(x.name)}
                              </span>
                              {idx < objSao[cat].length - 1 ? ',' : ''}
                            </>
                          )
                        })}
                      </div>
                    )
                  })}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  width="16.6%"
                  align="center"
                  colSpan={2}
                  style={{
                    backgroundColor: 'white',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  Mậu
                </TableCell>
                <TableCell
                  width="16.6%"
                  align="center"
                  colSpan={2}
                  style={{
                    backgroundColor: 'white',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  Kỷ
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell width="8.3%" align="center" colSpan={2}>
                  {Object.keys(objSaoMau).map((cat: string, index: number) => {
                    return (
                      <div className="block text-left" key={index}>
                        {cat === 'default' ? '' : `${cat}: `}
                        {objSaoMau[cat].map((x: any, idx: number) => {
                          const className =
                            x.good_ugly_stars === 1
                              ? 'text-red-tag text-red-primary text-primary'
                              : ''
                          return (
                            <>
                              <span
                                className={`cursor-pointer  ${className}`}
                                onClick={() => handleClickStars(x)}
                              >
                                &nbsp;{jsUcfirst(x.name)}
                              </span>
                              {idx < objSaoMau[cat].length - 1 ? ',' : ''}
                            </>
                          )
                        })}
                      </div>
                    )
                  })}
                </TableCell>
                <TableCell width="8.3%" align="center" colSpan={2}>
                  {Object.keys(objSaoKy).map((cat: string, index: number) => {
                    return (
                      <div className="block text-left" key={index}>
                        {cat === 'default' ? '' : `${cat}: `}
                        {objSaoKy[cat].map((x: any, idx: number) => {
                          const className =
                            x.good_ugly_stars === 1
                              ? 'text-red-tag text-red-primary text-primary'
                              : ''
                          return (
                            <>
                              <span
                                className={`cursor-pointer  ${className}`}
                                onClick={() => handleClickStars(x)}
                              >
                                &nbsp;{jsUcfirst(x.name)}
                              </span>
                              {idx < objSaoKy[cat].length - 1 ? ',' : ''}
                            </>
                          )
                        })}
                      </div>
                    )
                  })}
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          {!isTrungCung && (
            <TableBody>
              <TableRow>
                <TableCell width="25%" align="center" colSpan={6}>
                  {Object.keys(objSao).map((cat: string, index: number) => {
                    return (
                      <div className="block text-center" key={index}>
                        {cat === 'default' ? '' : `${cat}: `}
                        {objSao[cat].map((x: any, idx: number) => {
                          const className =
                            x.good_ugly_stars === 1
                              ? 'text-red-tag text-red-primary text-primary'
                              : ''
                          return (
                            <>
                              <span
                                className={`cursor-pointer  ${className}`}
                                onClick={() => handleClickStars(x)}
                              >
                                &nbsp;{jsUcfirst(x.name)}
                              </span>
                              {idx < objSao[cat].length - 1 ? ',' : ''}
                            </>
                          )
                        })}
                      </div>
                    )
                  })}
                </TableCell>
              </TableRow>
              <TableRow>
                {cungSelect.son.map((row: any, idx: number) => {
                  const saoSon = thansatByYear.filter(
                    (x: any) =>
                      x.direction === row.name && x.sao.is_mountain === 2
                  )
                  const labelSon = getLabelGoodUgly(saoSon)
                  return (
                    <TableCell
                      width="16.6%"
                      align="center"
                      colSpan={2}
                      key={idx}
                      style={{
                        backgroundColor: row.backgroundColor,
                        color: row.color,
                        fontWeight: 'bold',
                      }}
                    >
                      {row.name} {labelSon}
                    </TableCell>
                  )
                })}
              </TableRow>
              <TableRow>
                {cungSelect.son.map((el: any) => {
                  const saoSon = thansatByYear.filter(
                    (x: any) =>
                      x.direction === el.name && x.sao.is_mountain === 2
                  )
                  const obj = formatSao(saoSon)

                  return (
                    <>
                      <TableCell width="8.3%" align="center" colSpan={2}>
                        {Object.keys(obj).map((cat: string, index: number) => {
                          return (
                            <div className="block text-left" key={index}>
                              {cat === 'default' ? '' : `${cat}: `}
                              {obj[cat].map((x: any, idx: number) => {
                                const className =
                                  x.good_ugly_stars === 1
                                    ? 'text-red-tag text-red-primary text-primary'
                                    : ''
                                return (
                                  <>
                                    <span
                                      className={`cursor-pointer  ${className}`}
                                      onClick={() => handleClickStars(x)}
                                    >
                                      &nbsp;{jsUcfirst(x.name)}
                                    </span>
                                    {idx < obj[cat].length - 1 ? ',' : ''}
                                  </>
                                )
                              })}
                            </div>
                          )
                        })}
                      </TableCell>
                    </>
                  )
                })}
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    )
  }

  return (
    <div className="than_sat overflow-hidden">
      <div className="flex gap-2 mb-4">
        <Autocomplete
          disablePortal
          id="year-select"
          options={Array.from({ length: 400 }, (_, i) => (i + 1900).toString())}
          className="w-32"
          renderInput={(params) => (
            <TextField variant="filled" {...params} label="Năm" />
          )}
          value={yearSelect}
          disableClearable
          onChange={(_, v: string) => {
            setYear(v)
            onChangeCurrentDate(dayjs(`${v}-${month}-${day}`))
          }}
          popupIcon={<IconDown />}
        />
        <Autocomplete
          disablePortal
          clearOnBlur
          id="month-select"
          options={months}
          className="w-32"
          renderInput={(params) => (
            <TextField variant="filled" {...params} label="Tháng" />
          )}
          value={monthSelect || null}
          onChange={(_, v: string | null) => {
            setMonth(v || '')
            if (v) {
              onChangeCurrentDate(dayjs(`${year}-${v}-${day}`))
            } else {
              onChangeCurrentDate(
                dayjs(`${year}-${dayjs().format('MM')}-${day}`)
              )
            }
          }}
          popupIcon={<IconDown />}
        />
      </div>
      <>
        <div
          className={twMerge(
            'circle w-full max-w-[600px] aspect-square',
            'animate-zoomOut'
          )}
        >
          {cungSon.map((x: any) => {
            return (
              <div
                key={x.name}
                className="li1 part-layout transition-all hover:bg-black/10"
              ></div>
            )
          })}
          <div className="circle-layout">
            {cungSon.map((x: any) => {
              return (
                <>
                  {x.son.map((x1: any) => {
                    return (
                      <div key={x1.name} className="li none-border">
                        <div className="text">
                          <span>{x1.coordinates}°</span>
                        </div>
                      </div>
                    )
                  })}
                </>
              )
            })}
            <div className="child">
              {cungSon.map((x: any) => {
                return (
                  <>
                    {x.son.map((x1: any) => {
                      const bgColor = getBgColorCan(x1.name)
                      return (
                        <div
                          key={x1.name}
                          className={`li ${bgColor} hover:opacity-70`}
                          onClick={() => {
                            chooseCung(x.name, x1.name)
                          }}
                        >
                          <div
                            className={twMerge(
                              'text',
                              bgColor === 'bg-black' && 'text-white'
                            )}
                          >
                            <span>{x1.name}</span>
                          </div>
                        </div>
                      )
                    })}
                  </>
                )
              })}
              <div className="child-1">
                {cungSon.map((x: any) => {
                  return (
                    <div key={x.name} className="li1 hover:opacity-70">
                      <div className="text1">
                        <span
                          onClick={() => {
                            chooseCung(x.name, '')
                          }}
                        >
                          {x.direction}
                        </span>
                      </div>
                    </div>
                  )
                })}
                <div className="child-2">
                  {cungSon.map((el: any) => {
                    const bgColor = getBgColorCung(el.name)
                    return (
                      <div
                        key={el.name}
                        className={`li1 ${bgColor} hover:opacity-70`}
                      >
                        <div
                          className={twMerge(
                            'text1',
                            bgColor === 'bg-black' && 'text-white'
                          )}
                        >
                          <span onClick={() => chooseCung(el.name, '')}>
                            {el.name}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                  <div className="child-3">
                    <div className="flex items-center w-fit">
                      <div>
                        <span onClick={() => chooseCungTrung()}>
                          Trung Cung
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="flicker mt-5 mb-10 text-center">
          * Click vào cung hoặc sơn để hiển thị thông tin sao
        </p>
      </>
      {renderThansatByYear()}

      <ModalInformation
        isOpen={isOpen}
        toggleModal={toggleModal}
        titleModal={`Sao ${jsUcfirst(chooseStars.name)}`}
      >
        <div>{chooseStars.data}</div>
        <div className="flex items-center justify-end mt-5 gap-x-4">
          <Button
            primary
            onClick={toggleModal}
            className="h-[2.5rem] pt-2 w-[2.5rem]"
          >
            OK
          </Button>
        </div>
      </ModalInformation>
    </div>
  )
}

export default ThanSat
