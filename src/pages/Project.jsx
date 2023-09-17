import React, { useState, useEffect } from 'react';
import { Editor, Frame, Element, useNode, useEditor } from '@craftjs/core';
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Image,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Highlight,
} from '@chakra-ui/react';
import LoadCircle from '../components/LoadCircle';
import InfoCard from '../components/InfoCard';
import Toolbox from '../components/Toolbox';
import SearchBox from '../components/SearchBox';
import ULoadCircle from '../components/user/ULoadCircle';
import UInfoCard from '../components/user/UInfoCard';
import UChart from '../components/user/UChart';
import { useEditorNodes, ProvideEditorNodes } from '../hooks/useEditorNodes';
import { useQuery } from 'react-query';
import Chart from '../components/Chart';
import { YMaps, Map, Placemark, Polyline } from '@pbe/react-yandex-maps';

function EditorToggle() {
  const { actions, enabled } = useEditor((state, query) => ({
    enabled: state.options.enabled,
  }));

  function onToggle() {
    actions.setOptions(options => (options.enabled = !enabled));
  }

  return (
    <Button
      pos="relative"
      onClick={onToggle}
      top={-2}
      zIndex={1}
      variant="link"
    >
      Изменить
    </Button>
  );
}

function ProjectWrapper({ name, components }) {
  return (
    <Editor
      enabled={false}
      resolver={{
        Stack,
        Heading,
        Button,
        SearchBox,
        LoadCircle,
        InfoCard,
        ULoadCircle,
        Toolbox,
        Flex,
        UInfoCard,
        UChart,
        Chart,
        EditorToggle,
        Text,
        Image,
        SimpleGrid,
        Card,
        CardHeader,
        CardBody,
        CardFooter,
        YMaps,
        Map,
        Placemark,
        Polyline,
        Highlight,
      }}
    >
      <ProvideEditorNodes>
        <Project name={name} components={components} />
      </ProvideEditorNodes>
    </Editor>
  );
}

function Project({ name, components }) {
  const { data, isLoading, error } = useQuery('', () =>
    fetch('http://81.200.145.23/api/v1/data').then(res => res.json())
  );
  const { nodes, setNodes } = useEditorNodes();

  if (isLoading) return 'Loading...';
  if (error) return `An error has occurred: ${error.message}`;

  const chartSettings = [
    {
      title: ' ',
      datakeyX: 'epoch_time',
      datakeysY: [
        // 'cavitypressure',
        // 'cavitytemp',
        // 'dastemp',
        // 'etalontemp',
        // 'warmboxtemp',
        // 'species',
        // 'n2o',
        // 'co2',
        // 'ch4',
        // 'h2o',
        // 'nh3',
        'Mean CO2 (ppm)',
        'Mean CH4 (ppm)',
        'Mean N2O (ppm)',
        'Mean NH3 (ppm)',
        'Mean H2O (percent)',
        'Cav. Pressure (kPa)',
        'Cav. Temperature (K)',
        'Water Content (fraction)',
        'Chmbr. Temperature (K)',
        'Chmbr. Pressure (kPa)',
        'Flux CO2 (E) (umol/m^2/s)',
        'Flux CH4 (E) (nmol/m^2/s)',
        'Flux N2O (E) (nmol/m^2/s)',
        'Flux NH3 (E) (umol/m^2/s)',
        'Soil VWC (%)',
        'Soil Temperature (degC)',
      ],
    },
    {
      title: ' ',
      datakeyX: 'epoch_time',
      datakeysY: [
        'Точка росы',
        'Атмосферное давление',
        'Скорость ветра',
        'Направление ветра',
        'Приходящая солнечная радиация',
        'Влагосодержание почвы',
        'Электропроводность почвы',
        'Температура почвы',
      ],
    },
    {
      title: ' ',
      datakeyX: 'epoch_time',
      datakeysY: [
        'co2_flux',
        'h2o_flux',
        'ch4_flux',
        'air_temperature',
        'wind_speed',
      ],
    },
  ];

  return (
    <Frame data={nodes ? nodes : undefined}>
      <Element
        is={Stack}
        // alignContent="space-between"
        direction="row"
        overflow="hidden"
      >
        <Element is={Flex} flex={2} direction="column">
          <Element is={Stack} direction="row">
            <Heading>{name}</Heading>
            <EditorToggle />
          </Element>
          <Element is={Stack} mt={4} spacing={4}>
            {/* <SearchBox /> */}
            <Element
              is="div"
              style={{
                width: '100%',
                minHeight: '10px',
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
              }}
              canvas
            >
              {/* <ULoadCircle title="нагрузка на сервер" load={20} /> */}
              {/* <UInfoCard /> */}
            </Element>
            <Element is={Stack} spacing={8} paddingBottom={100}>
              <Stack>
                <Heading size="lg">Участок «Старопромысловский»</Heading>
                Площадь - 41 Га Степные ландшафты межгорных долин
                Терско-Сунженской возвышенности.
                <Text fontWeight="bold">Площадь - 41 Га</Text>
                <Text>
                  Степные ландшафты распространены к югу от р. Терек в пределах
                  Надтеречной равнины, Терско-Сунженской возвышенности,
                  Алханчуртской долины и северной части Чеченской наклонной
                  равнины. Для естественных ландшафтов степной зоны характерны
                  разнотравно-типчаково-ковыльные и борадачёвые, местами
                  распаханные степные ценозы; разнотравно-злаковые полынные
                  степи; вторичные полынно-борадачёвые степи с фрагментами
                  шибляка. Большая часть степей распахана и превращена в
                  агроценозы. На склонах северных экспозиций Терско-Сунженского
                  хребтов сохранились широколиственные леса. Преобладают
                  каштановые и тёмно-каштановые почвы. Чернозёмы карбонатные
                  выщелоченные в сочетании с чернозёмами карбонатными,
                  солонцеватыми и смытыми, характерны для Терско-Сунженской
                  возвышенности. В Алханчуртской долине преобладают солонцеватые
                  и солончаковые разновидности каштановых почв преимущественно
                  суглинистого механического состава.
                </Text>
              </Stack>
              <Stack>
                <Heading size="md">Местоположение</Heading>
                <div
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    width: '100%',
                    height: 500,
                  }}
                >
                  <a
                    href="https://yandex.ru/maps/1106/grozniy/?utm_medium=mapframe&utm_source=maps"
                    style={{
                      color: '#eee',
                      fontSize: '12px',
                      position: 'absolute',
                      top: '0px',
                    }}
                  >
                    Грозный
                  </a>
                  <a
                    href="https://yandex.ru/maps/1106/grozniy/?from=mapframe&ll=45.579288%2C43.368638&mode=usermaps&source=mapframe&um=constructor%3Af2f703eee77a756f20c19c29ea5aa5209a9052ebdacfdb126a905d0b9284d4c4&utm_medium=mapframe&utm_source=maps&z=14"
                    style={{
                      color: '#eee',
                      fontSize: '12px',
                      position: 'absolute',
                      top: '14px',
                    }}
                  >
                    Яндекс Карты — транспорт, навигация, поиск мест
                  </a>
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?from=mapframe&ll=45.579288%2C43.368638&mode=usermaps&source=mapframe&um=constructor%3Af2f703eee77a756f20c19c29ea5aa5209a9052ebdacfdb126a905d0b9284d4c4&utm_source=mapframe&z=14"
                    width="100%"
                    height="100%"
                    frameBorder="1"
                    allowFullScreen="true"
                    style={{ position: 'relative' }}
                  ></iframe>
                </div>
              </Stack>
              <Stack spacing={4}>
                <Heading size="md">Оборудование</Heading>
                <SimpleGrid
                  spacing={4}
                  templateColumns="repeat(auto-fill, minmax(400px, 1fr))"
                  // gap={10}
                >
                  <Card>
                    <CardHeader>
                      <Heading size="sm" mb={4}>
                        Picarro G2508
                      </Heading>
                      <Highlight
                        query={['ОНЛАЙН']}
                        styles={{
                          px: '2',
                          py: '1',
                          rounded: 'full',
                          bg: 'green.200',
                          fontWeight: 'bold',
                        }}
                      >
                        Статус: ОНЛАЙН
                      </Highlight>
                    </CardHeader>
                    <CardBody>
                      <Image
                        src="https://isotope-expert.ru/assets/cache_image/userfiles/images/picarro-g2308_633x360_1be.jpg"
                        width={250}
                        height={200}
                      />
                      <Text>
                        Технология Picarro CRDS обеспечивает измерение СН4, N2O
                        и водяного пара с чувствительностью в единицы ppb с
                        очень малым дрейфом, что важно для длительных
                        непрерывных измерений в сложных и меняющихся полевых
                        условиях. G2308 имеет уникальные программные алгоритмы
                        Picarro для коррекции данных по концентрации водяного
                        пара, а также определения и отмечания спектральных
                        интерференций.
                      </Text>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardHeader>
                      <Heading size="sm" mb={4}>
                        Li-Cor Eddy Covariance
                      </Heading>
                      <Highlight
                        query={['ОНЛАЙН']}
                        styles={{
                          px: '2',
                          py: '1',
                          rounded: 'full',
                          bg: 'green.200',
                          fontWeight: 'bold',
                        }}
                      >
                        Статус: ОНЛАЙН
                      </Highlight>
                    </CardHeader>
                    <CardBody>
                      <Image
                        src="https://www.licor.com/images/env/backgrounds/eddy-covariance/ec-thumb.jpg"
                        width={250}
                        height={200}
                      />
                      <Text>
                        Система измерения потоков парниковых газов (CO2, CH4 И
                        H2O), работающая по методу Eddy Covariance.
                      </Text>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardHeader>
                      <Heading size="sm" mb={4}>
                        Campbell Scientific MesoPRO
                      </Heading>
                      <Highlight
                        query={['ОНЛАЙН']}
                        styles={{
                          px: '2',
                          py: '1',
                          rounded: 'full',
                          bg: 'green.200',
                          fontWeight: 'bold',
                        }}
                      >
                        Статус: ОНЛАЙН
                      </Highlight>
                    </CardHeader>
                    <CardBody>
                      <Image
                        src="https://labinstruments.ru/upload/w_320/61e9386db12ca-1.jpg"
                        width={150}
                        height={200}
                      />
                      <Text>
                        MesoPRO — это высокоточная метеорологическая станция
                        исследовательского уровня для мониторинга параметров
                        атмосферы. Станция предназначена для долгосрочного
                        мониторинга. Удаленный мониторинг и сбор данных
                        осуществляются через модем промышленной сотовой сети 4G
                        LTE. Система включает в себя комплекс датчиков, которые
                        обеспечивают точные измерения, параметров окружающей
                        среды. Метеостанция включает в себя высококачественные
                        датчики, которые необходимы для исследований показателей
                        окружающей среды, сбора данных и дальнейшей их
                        обработки.
                      </Text>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardHeader>
                      <Heading size="sm" mb={4}>
                        Picarro GasScouter G4301
                      </Heading>
                      <Highlight
                        query={['РУЧНАЯ ЗАГРУЗКА']}
                        styles={{
                          px: '2',
                          py: '1',
                          rounded: 'full',
                          bg: 'gray.200',
                          fontWeight: 'bold',
                        }}
                      >
                        Статус: РУЧНАЯ ЗАГРУЗКА
                      </Highlight>
                    </CardHeader>
                    <CardBody>
                      <Image
                        src="https://www.picarro.com/sites/default/files/styles/full/public/photos/2017/GasScouter-Internal-View.jpg?itok=25T8pNDB"
                        width={200}
                        height={200}
                      />
                      <Text>
                        G4301 является первым анализатором в новой линейке
                        переносных CRDS анализаторов Picarro c питанием от
                        батареи. Анализатор одновременно измеряет концентрации
                        СО2, СН4 и Н2О в очень широком диапазоне, обеспечивая
                        как измерения фона, так и эмиссий. Его система ввода
                        может использоваться как для непрерывного «полевого»
                        картирования, так и в системах открытого и замкнутого
                        цикла с почвенными камерами.
                      </Text>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardHeader>
                      <Heading size="sm" mb={4}>
                        Геоскан 401
                      </Heading>
                      <Highlight
                        query={['РУЧНАЯ ЗАГРУЗКА']}
                        styles={{
                          px: '2',
                          py: '1',
                          rounded: 'full',
                          bg: 'gray.200',
                          fontWeight: 'bold',
                        }}
                      >
                        Статус: РУЧНАЯ ЗАГРУЗКА
                      </Highlight>
                    </CardHeader>
                    <CardBody>
                      <Image
                        src="https://www.geoscan.aero/sites/default/files/2021-10/cam_00000_7.jpg"
                        width={250}
                        height={200}
                      />
                      <Text>
                        Геоскан 401 Геодезия – это аэрофотосъемочный комплекс с
                        вертикальным взлетом и посадкой. Способен стартовать с
                        площадки диаметром 5 м, работать в ограниченном
                        пространстве и точно огибать рельеф. С Геоскан 401
                        Геодезия Вы сможете снимать высотные сооружения (трубы),
                        объекты с выраженным рельефом и значительным перепадом
                        высот (карьеры) или вертикальные поверхности (фасады).
                        Благодаря геодезическому GNSS-приемнику на борту,
                        полученные снимки позволят создавать точные
                        геопривязанные ортофотопланы и 3D-модели.
                      </Text>
                    </CardBody>
                  </Card>
                </SimpleGrid>
              </Stack>
              {Object.keys(data).map((device, index) => (
                <Stack key={index}>
                  <Heading size="md">{device}</Heading>
                  {Array.isArray(data[device]) && data[device].length > 0 ? (
                    <Chart
                      data={data[device]}
                      chartSettings={chartSettings[index]}
                    />
                  ) : (
                    <Text>Нет данных</Text>
                  )}
                </Stack>
              ))}
              <Element
                is="div"
                style={{
                  width: '100%',
                  minHeight: '100px',
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                }}
                canvas
              >
                {/* <ULoadCircle title="нагрузка на сервер" load={20} /> */}
                {/* <UInfoCard /> */}
              </Element>
            </Element>
          </Element>
        </Element>
        <Element is={Stack} flex={1}>
          <Stack pos="fixed">
            <Toolbox />
          </Stack>
        </Element>
      </Element>
    </Frame>
  );
}

export default ProjectWrapper;
