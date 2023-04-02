import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useEffect, useState } from 'react'

import homeApi from '@/api/home.api'
import type { ThanSatFormValue } from '@/models'
import { useStore } from '@/store/useStore'
import { MONTH_PROPERTY } from '@/utils/constant'
import { getDayName, getLunarDate } from '@/utils/helpers'
import {useToggle} from "@/hooks";
import {Button} from "@/components/button";
import {ModalInformation} from "@/components/modal";
import * as React from "react";

const cungSon = [
  {
    name: 'Khảm',
    direction: 'Bắc',
    coordinates: '337,5',
    son: [
      {
        name: 'Nhâm',
        coordinates: '337,5',
      },
      {
        name: 'Tý',
        coordinates: '337,5',
      },
      {
        name: 'Quý',
        coordinates: '7,5',
      },
    ],
  },
  {
    name: 'Cấn',
    direction: 'Đông bắc',
    coordinates: '22,5',
    son: [
      {
        name: 'Sửu',
        coordinates: '22,5',
      },
      {
        name: 'Cấn',
        coordinates: '37,5',
      },
      {
        name: 'Dần',
        coordinates: '52,5',
      },
    ],
  },
  {
    name: 'Chấn',
    direction: 'Đông',
    coordinates: '67,5',
    son: [
      {
        name: 'Giáp',
        coordinates: '67,5',
      },
      {
        name: 'Mão',
        coordinates: '82,5',
      },
      {
        name: 'Ất',
        coordinates: '97,5',
      },
    ],
  },
  {
    name: 'Tốn',
    direction: 'Đông Nam',
    coordinates: '112,5',
    son: [
      {
        name: 'Thìn',
        coordinates: '112,5',
      },
      {
        name: 'Tốn',
        coordinates: '127,5',
      },
      {
        name: 'Tỵ',
        coordinates: '142,5',
      },
    ],
  },
  {
    name: 'Ly',
    direction: 'Nam',
    coordinates: '157,5',
    son: [
      {
        name: 'Bính',
        coordinates: '157,5',
      },
      {
        name: 'Ngọ',
        coordinates: '172,5',
      },
      {
        name: 'Đinh',
        coordinates: '187,5',
      },
    ],
  },
  {
    name: 'Khôn',
    direction: 'Tây Nam',
    coordinates: '202,5',
    son: [
      {
        name: 'Mùi',
        coordinates: '202,5',
      },
      {
        name: 'Khôn',
        coordinates: '217,5',
      },
      {
        name: 'Thân',
        coordinates: '232,5',
      },
    ],
  },
  {
    name: 'Đoài',
    direction: 'Nam',
    coordinates: '247,5',
    son: [
      {
        name: 'Canh',
        coordinates: '247,5',
      },
      {
        name: 'Dậu',
        coordinates: '262,5',
      },
      {
        name: 'Tân',
        coordinates: '277,5',
      },
    ],
  },
  {
    name: 'Càn',
    direction: 'Tây Bắc',
    coordinates: '292,5',
    son: [
      {
        name: 'Tuất',
        coordinates: '337,5',
      },
      {
        name: 'Càn',
        coordinates: '307,5',
      },
      {
        name: 'Hợi',
        coordinates: '322,5',
      },
    ],
  },
]

function ThanSat() {
  const currentDate = useStore((state) => state.currentDate)
  const day = currentDate.format('DD')
  const month = currentDate.format('MM')
  const year = currentDate.format('YYYY')
  const currentLunarDate = getLunarDate(+day, +month, +year)
  const dayName = getDayName(currentLunarDate)
  const [thansatByMonth, setThansatByMonth] = useState<any>([])
  const [thansatByYear, setThansatByYear] = useState<any>([])
  const [isOpen, toggleModal] = useToggle()
  const [chooseStars, setChooseStars] = useState<{
    name: string
    data: string
  }>({
    name: '',
    data: '',
  })
  const [thanSatInfo, setThanSatInfo] = useState<ThanSatFormValue>()
  useEffect(() => {
    ;(async () => {
      try {
        const responseData = await homeApi.getThanSatInfo(dayName[2] || '')
        setThanSatInfo(responseData)

        const arrTmp = responseData.than_sat_by_month.map((el: any) => {
          const property =
            MONTH_PROPERTY[parseInt(month, 10) as keyof typeof MONTH_PROPERTY]
          return {
            name: el[property].split(' '),
            sao: el.sao,
          }
        })
        setThansatByMonth(arrTmp)
        setThansatByYear(responseData.than_sat_by_year)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    })()
  }, [currentDate])

  const jsUcfirst = (string: string) => {
    const tmp = string.toLowerCase()
    return tmp.charAt(0).toUpperCase() + tmp.slice(1)
  }

  const handleClickStars = (el: { name: string; property: string }) => {
    setChooseStars({
      name: el?.name || '',
      data: el?.property || '',
    })
    toggleModal()
  }

  if (!thanSatInfo) return null

  const renderThansatByMonth = (start: number) => {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="am phu thai tue">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={12}>
                Tháng {month}
              </TableCell>
            </TableRow>
            <TableRow>
              {cungSon.map((el: any, ab: number) => {
                if (ab > start + 1 || ab < start) return null
                return (
                  <TableCell width="50%" key={ab} align="center" colSpan={6}>
                    {el.name}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {cungSon.map((el: any, ab: number) => {
                if (ab > start + 1 || ab < start) return null
                return (
                  <TableCell key={ab} align="center" colSpan={6}>
                    {el.direction}
                  </TableCell>
                )
              })}
            </TableRow>

            <TableRow>
              {cungSon.map((el: any, ab: number) => {
                if (ab > start + 1 || ab < start) return null
                return (
                  <TableCell key={ab} align="left" colSpan={6}>
                    {el.coordinates}°
                  </TableCell>
                )
              })}
            </TableRow>
            <TableRow>
              {cungSon.map((el: any, ab: number) => {
                if (ab > start + 1 || ab < start) return null

                const tmp = thansatByMonth.filter(
                  (x: { name: any; sao: any }) => x.name.includes(el.name)
                )
                const goodStars = tmp.filter(
                  (x: { name: any; sao: any }) => x.sao.good_ugly_stars === 1
                )
                const uglyStars = tmp.filter(
                  (x: { name: any; sao: any }) => x.sao.good_ugly_stars === 2
                )

                return (
                  <>
                    <TableCell width="25%" align="left" colSpan={3}>
                      <span className="text-red-tag text-red-primary text-primary">
                        {goodStars.map((x: any) => {
                          return (
                              <>
                                <span className="cursor-pointer" onClick={() => handleClickStars(x.sao)}>
                                  {jsUcfirst(x.sao.name)}
                                </span>
                                ,
                              </>
                          )
                        })}
                      </span>
                    </TableCell>
                    <TableCell width="25%" align="left" colSpan={3}>
                      <span>
                        {uglyStars.map((x: any) => {
                          return (
                              <>
                                <span className="cursor-pointer" onClick={() => handleClickStars(x.sao)}>
                                  {jsUcfirst(x.sao.name)}
                                </span>
                                ,
                              </>
                          )
                        })}
                      </span>
                    </TableCell>
                  </>
                )
              })}
            </TableRow>
            <TableRow>
              {cungSon.map((el: any, ab: number) => {
                if (ab > start + 1 || ab < start) return null
                return el.son.map((row: any) => {
                  return (
                    <TableCell
                      width="16.6%"
                      key={ab}
                      align="center"
                      colSpan={2}
                    >
                      {row.name}
                    </TableCell>
                  )
                })
              })}
            </TableRow>
            <TableRow>
              {cungSon.map((el: any, ab: number) => {
                if (ab > start + 1 || ab < start) return null
                return el.son.map((row: any, id: number) => {
                  return (
                    <TableCell width="16.6%" key={id} align="left" colSpan={2}>
                      {row.coordinates}°
                    </TableCell>
                  )
                })
              })}
            </TableRow>
            <TableRow>
              {cungSon.map((el: any, ab: number) => {
                if (ab > start + 1 || ab < start) return null
                return el.son.map((row: any) => {
                  const tmp = thansatByMonth.filter(
                    (x: { name: any; sao: any }) => x.name.includes(row.name)
                  )
                  const goodStars = tmp.filter(
                    (x: { name: any; sao: any }) => x.sao.good_ugly_stars === 1
                  )
                  const uglyStars = tmp.filter(
                    (x: { name: any; sao: any }) => x.sao.good_ugly_stars === 2
                  )

                  return (
                    <>
                      <TableCell width="8.3%" align="left" colSpan={1}>
                        <span className="text-red-tag text-red-primary text-primary">
                          {goodStars.map((x: any) => {
                            return (
                              <>
                              <span className="cursor-pointer" onClick={() => handleClickStars(x.sao)}>
                                {jsUcfirst(x.sao.name)}
                              </span>
                                ,
                              </>
                            )
                          })}
                        </span>
                      </TableCell>
                      <TableCell width="8.3%" align="left" colSpan={1}>
                        <span>
                          {uglyStars.map((x: any) => {
                            return (
                              <>
                              <span className="cursor-pointer" onClick={() => handleClickStars(x.sao)}>
                                {jsUcfirst(x.sao.name)}
                              </span>
                                ,
                              </>
                            )
                          })}
                        </span>
                      </TableCell>
                    </>
                  )
                })
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  const renderThansatByYear = (start: number) => {
    return (
        <TableContainer component={Paper}>
          <Table aria-label="am phu thai tue">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={12}>
                  Năn {year}
                </TableCell>
              </TableRow>
              <TableRow>
                {cungSon.map((el: any, ab: number) => {
                  if (ab > start + 1 || ab < start) return null
                  return (
                      <TableCell width="50%" key={ab} align="center" colSpan={6}>
                        {el.name}
                      </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {cungSon.map((el: any, ab: number) => {
                  if (ab > start + 1 || ab < start) return null
                  return (
                      <TableCell key={ab} align="center" colSpan={6}>
                        {el.direction}
                      </TableCell>
                  )
                })}
              </TableRow>

              <TableRow>
                {cungSon.map((el: any, ab: number) => {
                  if (ab > start + 1 || ab < start) return null
                  return (
                      <TableCell key={ab} align="left" colSpan={6}>
                        {el.coordinates}°
                      </TableCell>
                  )
                })}
              </TableRow>
              <TableRow>
                {cungSon.map((el: any, ab: number) => {
                  if (ab > start + 1 || ab < start) return null

                  const tmp = thansatByYear.filter(
                      (x: { direction: any; sao: any }) => x.direction.includes(el.name)
                  )
                  const goodStars = tmp.filter(
                      (x: { name: any; sao: any }) => x.sao.good_ugly_stars === 1
                  )
                  const uglyStars = tmp.filter(
                      (x: { name: any; sao: any }) => x.sao.good_ugly_stars === 2
                  )

                  return (
                    <>
                      <TableCell width="25%" align="left" colSpan={3}>
                        <span className="text-red-tag text-red-primary text-primary">
                          {goodStars.map((x: any) => {
                            return (
                                <>
                                <span className="cursor-pointer" onClick={() => handleClickStars(x.sao)}>
                                  {jsUcfirst(x.sao.name)}
                                </span>
                                  ,
                                </>
                            )
                          })}
                        </span>
                      </TableCell>
                      <TableCell width="25%" align="left" colSpan={3}>
                        <span>
                          {uglyStars.map((x: any) => {
                            return (
                                <>
                                <span className="cursor-pointer" onClick={() => handleClickStars(x.sao)}>
                                  {jsUcfirst(x.sao.name)}
                                </span>
                                  ,
                                </>
                            )
                          })}
                        </span>
                      </TableCell>
                    </>
                  )
                })}
              </TableRow>
              <TableRow>
                {cungSon.map((el: any, ab: number) => {
                  if (ab > start + 1 || ab < start) return null
                  return el.son.map((row: any) => {
                    return (
                        <TableCell
                            width="16.6%"
                            key={ab}
                            align="center"
                            colSpan={2}
                        >
                          {row.name}
                        </TableCell>
                    )
                  })
                })}
              </TableRow>
              <TableRow>
                {cungSon.map((el: any, ab: number) => {
                  if (ab > start + 1 || ab < start) return null
                  return el.son.map((row: any, id: number) => {
                    return (
                        <TableCell width="16.6%" key={id} align="left" colSpan={2}>
                          {row.coordinates}°
                        </TableCell>
                    )
                  })
                })}
              </TableRow>
              <TableRow>
                {cungSon.map((el: any, ab: number) => {
                  if (ab > start + 1 || ab < start) return null
                  return el.son.map((row: any) => {
                    const tmp = thansatByYear.filter(
                        (x: { direction: any; sao: any }) => x.direction.includes(row.name)
                    )
                    const goodStars = tmp.filter(
                        (x: { name: any; sao: any }) => x.sao.good_ugly_stars === 1
                    )
                    const uglyStars = tmp.filter(
                        (x: { name: any; sao: any }) => x.sao.good_ugly_stars === 2
                    )

                    return (
                        <>
                          <TableCell width="8.3%" align="left" colSpan={1}>
                            <span className="text-red-tag text-red-primary text-primary">
                              {goodStars.map((x: any) => {
                                return (
                                  <>
                                    <span className="cursor-pointer" onClick={() => handleClickStars(x.sao)}>
                                      {jsUcfirst(x.sao.name)}
                                    </span>
                                    ,
                                  </>
                                )
                              })}
                            </span>
                          </TableCell>
                          <TableCell width="8.3%" align="left" colSpan={1}>
                            <span>
                              {uglyStars.map((x: any) => {
                                return (
                                  <>
                                  <span className="cursor-pointer" onClick={() => handleClickStars(x.sao)}>
                                    {jsUcfirst(x.sao.name)}
                                  </span>
                                    ,
                                  </>
                                )
                              })}
                            </span>
                          </TableCell>
                        </>
                    )
                  })
                })}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
    )
  }

  return (
    <div className="flex flex-col gap-y-10">
      {renderThansatByYear(0)}
      {renderThansatByMonth(0)}
      {renderThansatByYear(2)}
      {renderThansatByMonth(2)}
      {renderThansatByYear(4)}
      {renderThansatByMonth(4)}
      {renderThansatByYear(6)}
      {renderThansatByMonth(6)}
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
