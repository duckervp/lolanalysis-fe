import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import PanoramaFishEyeTwoToneIcon from '@mui/icons-material/PanoramaFishEyeTwoTone';

import { numberWithCommas } from 'src/utils/format-number';
import { fDate, fDateTime, fToMinuteSecondString } from 'src/utils/format-time';
import {
  getMapName,
  getItemImageUrl,
  getChampionImageUrl,
  getSummonerImageUrl,
} from 'src/utils/riot-image-url';

import { selectCurrentAccountPuuid } from 'src/redux/slice/accountSlice';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import CustomModal from 'src/components/modal/modal';

// ----------------------------------------------------------------------

export default function AppMatchHistory({ title, subheader, list, ...other }) {
  const [openMatchDetail, setOpenMatchDetail] = useState(false);

  const handleOpenMatchDetail = () => {
    setOpenMatchDetail(true);
  };

  return (
    <Box>
      <CustomModal open={openMatchDetail} setOpen={setOpenMatchDetail}>
        <MatchDetail title="a" subheader="b" />
      </CustomModal>
      <Card {...other}>
        <CardHeader title={title} subheader={subheader} />

        <Scrollbar>
          <Stack sx={{ p: 3, pr: 0 }}>
            {list.map((match) => (
              <Box key={match.matchId} onClick={handleOpenMatchDetail}>
                <MatchItem match={match} />
                <Divider variant="middle" sx={{ my: 2.5 }} />
              </Box>
            ))}
          </Stack>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Button
            size="small"
            color="inherit"
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
          >
            View all
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

AppMatchHistory.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

// ----------------------------------------------------------------------

function MatchItem({ match }) {
  const currentAccountPuuid = useSelector(selectCurrentAccountPuuid);
  const [currentUserChamp, setCurrentUserChamp] = useState();

  useEffect(() => {
    const getCurrentUserChampion = () => {
      match.participantDetails.forEach((participantDetail, index) => {
        if (participantDetail.puuid === currentAccountPuuid) {
          setCurrentUserChamp(participantDetail);
        }
      });
    };

    getCurrentUserChampion();
  }, [match, currentAccountPuuid]);

  return (
    <Stack direction="row" spacing={2}>
      <Box sx={{ position: 'relative' }}>
        <Box
          component="img"
          alt={currentUserChamp?.championName}
          src={getChampionImageUrl(currentUserChamp?.championName)}
          sx={{ width: 70, height: 70, borderRadius: 5, flexShrink: 0, border: '2px solid brown' }}
        />
        <Box
          sx={{
            width: 25,
            height: 25,
            backgroundColor: 'black',
            color: 'white',
            fontSize: '14px',
            borderRadius: 5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '2px solid brown',
            position: 'absolute',
            top: 45,
            left: 50,
          }}
        >
          {currentUserChamp?.championLevel}
        </Box>
      </Box>
      <Box sx={{ width: 5 }} />
      <Box>
        <Typography
          variant="subtitle1"
          sx={currentUserChamp?.win ? { color: 'green', height: 15 } : { color: 'red', height: 15 }}
        >
          {currentUserChamp?.win ? 'WIN' : 'LOST'}
        </Typography>
        <Typography variant="caption">{match?.gameMode}</Typography>
        <Box sx={{ border: '1px solid brown', mt: 0.5 }}>
          <Box
            component="img"
            alt="Spell D"
            src={getSummonerImageUrl(currentUserChamp?.spellD)}
            sx={{ width: 25, height: 25, flexShrink: 0 }}
          />
          <Box
            component="img"
            alt="Spell F"
            src={getSummonerImageUrl(currentUserChamp?.spellF)}
            sx={{ width: 25, height: 25, flexShrink: 0 }}
          />
        </Box>
      </Box>
      <Box sx={{ width: 40 }} />
      <Stack>
        <Stack direction="row" alignItems="center">
          <ItemBox itemId={currentUserChamp?.item0} />
          <ItemBox itemId={currentUserChamp?.item1} />
          <ItemBox itemId={currentUserChamp?.item2} />
          <ItemBox itemId={currentUserChamp?.item3} />
          <ItemBox itemId={currentUserChamp?.item4} />
          <ItemBox itemId={currentUserChamp?.item5} />
          <ItemBox itemId={currentUserChamp?.item6} />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ pt: 1, height: 1 }}
          justifyContent="space-between"
        >
          <Typography variant="body1" sx={{ height: 18 }} width="80px">
            {currentUserChamp?.kills} / {currentUserChamp?.deaths} / {currentUserChamp?.assists}
          </Typography>
          <Stack direction="row" alignItems="flex-end" spacing={0.5} width="50px">
            <Typography variant="body1" sx={{ height: 18 }}>
              {currentUserChamp?.totalMinionsKilled}
            </Typography>
            <Box
              component="img"
              src="src/assets/Minion_icon.webp"
              sx={{ width: 12.5, height: 12.5, backgroundColor: 'darkgray' }}
            />
          </Stack>
          <Stack direction="row" alignItems="flex-end" spacing={0.5}>
            <Typography variant="body1" sx={{ height: 18 }}>
              {numberWithCommas(currentUserChamp?.goldEarned)}
            </Typography>
            <Box component="img" src="src/assets/Gold.webp" sx={{ height: 12.5 }} />
          </Stack>
        </Stack>
      </Stack>
      <Stack alignItems="flex-start">
        <Typography variant="body2">{getMapName(match?.mapId)}</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2">{fToMinuteSecondString(match?.gameDuration)}</Typography>
          <PanoramaFishEyeTwoToneIcon style={{ fontSize: 7 }} />
          <Typography variant="body2">{fDate(match?.gameCreation, 'dd/MM/yyyy')}</Typography>
          <PanoramaFishEyeTwoToneIcon style={{ fontSize: 7 }} />
          <Typography variant="body2">{fDateTime(match?.gameCreation, 'p')}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

MatchItem.propTypes = {
  match: PropTypes.shape({
    matchId: PropTypes.string,
    participants: PropTypes.arrayOf(PropTypes.string),
    gameCreation: PropTypes.number,
    gameDuration: PropTypes.number,
    gameMode: PropTypes.string,
    mapId: PropTypes.number,
    participantDetails: PropTypes.arrayOf(
      PropTypes.shape({
        win: PropTypes.bool,
        kills: PropTypes.number,
        deaths: PropTypes.number,
        assists: PropTypes.number,
        championName: PropTypes.string,
        championLevel: PropTypes.number,
        goldEarned: PropTypes.number,
        totalMinionsKilled: PropTypes.number,
        item0: PropTypes.number,
        item1: PropTypes.number,
        item2: PropTypes.number,
        item3: PropTypes.number,
        item4: PropTypes.number,
        item5: PropTypes.number,
        item6: PropTypes.number,
        spellD: PropTypes.number,
        spellF: PropTypes.number,
        riotIdGameName: PropTypes.string,
        riotIdTagline: PropTypes.string,
        puuid: PropTypes.string,
        teamId: PropTypes.number,
      })
    ),
  }),
};

// ----------------------------------------------------------------------

const ItemBox = ({ itemId }) => {
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    setImageUrl(getItemImageUrl(itemId));
  }, [itemId]);

  if (itemId === 0 || !imageUrl) {
    return (
      <Box
        sx={{
          display: 'inline-block',
          width: 40,
          height: 40,
          border: '1px solid brown',
          marginLeft: '-1px',
        }}
      />
    );
  }

  return (
    <Box
      component="img"
      alt={`item-${itemId}`}
      src={imageUrl}
      sx={{ width: 40, height: 40, flexShrink: 0, border: '1px solid brown', marginLeft: '-1px' }}
    />
  );
};

ItemBox.propTypes = {
  itemId: PropTypes.number,
};

const MatchDetail = ({ title, subheader }) => {
  console.log();
  return (
    <Card>
      {/* <CardHeader title={title} subheader={subheader} /> */}
      Hello Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet harum sapiente eius,
      possimus placeat veritatis rem earum explicabo illo, eligendi architecto iusto fugit dolorem
      velit at. Quis facere unde provident mollitia? Ad, temporibus minus? Aspernatur, velit? Labore
      aliquid quisquam tempore sit quod consectetur maxime, optio at voluptatum, obcaecati eos.
      Molestias inventore incidunt recusandae reprehenderit optio ex hic accusamus vero cumque
      quidem animi amet nam a eveniet eius odio tempora, fugit excepturi, illum cum, adipisci
      consequatur! Dignissimos sed officiis fugit nostrum harum et voluptates doloribus sint
      adipisci reiciendis quae possimus, corporis non nobis, alias cupiditate tempore neque est
      ipsam vero ad impedit molestiae necessitatibus! Vitae repellat minima aperiam culpa
      repellendus at fuga cupiditate esse numquam neque, quae exercitationem quo iusto est. Nobis
      laboriosam itaque accusantium ab cumque repudiandae! Eveniet expedita dolores quibusdam?
      Molestias ratione eos, consequuntur nam quasi modi commodi facilis sint sed sunt, minima
      voluptatem illo. Recusandae esse quisquam nam a omnis? Facilis deserunt assumenda iste
      quisquam, quo iure voluptates fugit, necessitatibus blanditiis magni cumque optio, molestiae
      ab. Quisquam reiciendis officia incidunt pariatur error magnam dolor iste, fuga quod autem eos
      atque, omnis eveniet ratione odio architecto illo eius delectus rerum hic. Placeat culpa
      voluptates natus, fugit eos blanditiis similique ut consectetur labore. Labore, alias iure!
      Ipsum aut hic sapiente modi veniam officia iste perferendis quasi eos culpa numquam
      architecto, repudiandae assumenda ad quisquam delectus, soluta necessitatibus, aliquid
      voluptatum! Cumque, molestiae. Consequuntur aliquam, quod ullam maiores nulla debitis vel hic
      laboriosam suscipit facilis temporibus incidunt dolores molestias rem! Alias iure quas
      pariatur fuga autem maxime similique maiores neque numquam eum ea rerum laboriosam facere
      eveniet inventore nam architecto sequi, tempora libero magni temporibus, beatae vitae
      doloremque? Ipsam eos possimus distinctio et laborum odit. Expedita, neque dolorem architecto
      tenetur pariatur ipsa porro, labore eveniet debitis dolores culpa. Expedita provident quidem
      odit excepturi ipsam? Consectetur molestiae iste possimus quod mollitia! Mollitia eligendi,
      praesentium quam fugiat suscipit iusto! Dolor, rerum a recusandae consequuntur, magnam nulla,
      et repellendus perspiciatis quod rem repellat ex! Sed aspernatur sit nobis reiciendis maxime
      dolor, enim velit iure similique veritatis obcaecati? Repellendus sequi sunt animi, numquam
      dolores minus debitis cum autem unde ab quidem ratione libero quos corrupti beatae veritatis,
      iste amet fugiat qui sed hic laboriosam deserunt. Quis culpa nesciunt in, veritatis, veniam
      pariatur quasi quibusdam non quas est fuga nam perspiciatis esse minima dicta quae consequatur
      eum deleniti corporis. Modi, doloribus soluta delectus nemo officia odio voluptatibus dicta
      corrupti impedit. Est, sapiente quam inventore fugiat alias quaerat fuga iste, a ab
      reprehenderit quo fugit quasi nam officiis repellat! Natus dolorem maxime consequatur. In
      aspernatur a facere fugiat neque quidem alias temporibus nemo iusto id, dolor quia. Iusto,
      obcaecati hic nemo quas est fugiat, assumenda consectetur nisi, voluptates mollitia molestiae
      repellendus dolor. Reiciendis est quam temporibus, ea quibusdam architecto dicta. Excepturi,
      officia est. Ipsum voluptas error iure sequi itaque quia, dicta et sed? A odio tenetur nemo
      totam perspiciatis harum enim illo, officia reiciendis aut possimus blanditiis quis pariatur
      cupiditate quia ad voluptates libero tempore esse fugiat et commodi. Earum impedit assumenda
      libero quos nam minima consequatur facilis ipsa aliquid, dolorem velit maiores quaerat tempore
      veritatis saepe quibusdam vel expedita? Explicabo magni, minus non corrupti dolores itaque ex
      consectetur quo assumenda nemo officiis qui asperiores quae neque ipsum architecto ab? Dicta
      quo rem veritatis aut harum mollitia quam aperiam corrupti, temporibus dolorem! Sed corporis
      necessitatibus rerum recusandae ducimus corrupti sequi at eos, voluptas, laudantium minus enim
      est, animi voluptatum distinctio esse reprehenderit inventore excepturi atque quod molestias
      deleniti. Perspiciatis, dolor alias sit asperiores dolore error nesciunt, sint temporibus sed
      ex mollitia cupiditate expedita illum quae voluptatibus nisi quaerat nostrum. Hic eum ullam
      distinctio! Aut necessitatibus odio obcaecati? Iusto, neque perspiciatis dicta aliquam
      corrupti totam doloribus, qui id ad harum obcaecati alias corporis quasi nulla odio eos
      deleniti velit assumenda saepe, esse distinctio dolores nobis! Quae atque perferendis
      praesentium quisquam quibusdam, iure natus dignissimos sit incidunt perspiciatis temporibus
      rem reiciendis excepturi placeat quis aspernatur debitis? Ut deserunt nostrum deleniti
      inventore doloribus aspernatur quaerat saepe veritatis tenetur magni fugiat, harum, similique
      nemo quam dolor at rem expedita laudantium sit ratione. Ad, ab. Ea deserunt ducimus, inventore
      tenetur quas exercitationem eos, sit porro voluptatibus eius dicta incidunt odit id natus,
      fugit iste sequi modi excepturi repellat adipisci voluptas aperiam quae? Similique quidem nisi
      quibusdam explicabo minus! Perferendis assumenda omnis veritatis et ducimus porro magni itaque
      quo distinctio, autem, veniam officiis accusamus delectus explicabo non deleniti reprehenderit
      nemo! Eaque, placeat? Doloremque, necessitatibus sit repudiandae reiciendis perspiciatis,
      sint, placeat error nobis nulla dolorem quo ducimus! Vel provident tempore sed sunt, deserunt
      omnis placeat ad praesentium eligendi cum, iure at nulla ut eius et ullam corrupti eum iusto!
      Eos labore natus maxime nemo itaque autem et, est tempora esse quaerat amet. Fuga doloribus
      illo debitis voluptates cum id ipsum voluptatum ab aut quasi, tempore voluptatibus esse earum.
      Eveniet odit dignissimos exercitationem obcaecati perferendis tenetur id fuga velit
      praesentium, repellendus iste sunt dolor quaerat quasi minus asperiores, cumque, modi sequi
      expedita non at laboriosam nam officiis? Expedita temporibus ipsam eaque odit incidunt autem
      natus numquam impedit esse culpa. Corporis modi aut molestias odit delectus cum eligendi
      quibusdam eveniet! Velit reprehenderit, necessitatibus ratione pariatur, quae id magni est
      consequuntur, ducimus facilis nobis excepturi incidunt earum assumenda qui eum laboriosam
      soluta voluptates ab laborum porro amet. Laborum, quod fugiat obcaecati praesentium pariatur
      animi, ipsa sit debitis quas aliquid dolorum veniam labore voluptatum perferendis dicta unde
      vel fuga nam sint nihil blanditiis velit! Tenetur ex rerum ipsa harum culpa repellat. Aut
      voluptates numquam corporis expedita! Error similique reprehenderit eaque, illo possimus
      laudantium harum sequi debitis cupiditate natus modi rem, dicta, veniam minus expedita cum
      aspernatur dolorum exercitationem alias cumque sed. Blanditiis sit, saepe illo ipsum non ipsam
      expedita. Eius at, obcaecati ad, eveniet non nam delectus doloremque temporibus dignissimos
      similique quisquam. Atque quam tempora provident unde inventore expedita, nobis officia facere
      maiores quisquam harum sequi. Quaerat, delectus accusantium vero, assumenda deserunt, animi
      neque fuga sunt quisquam inventore nulla voluptas sequi deleniti. Perferendis ab laboriosam
      itaque illum sunt optio?
      {/* <Scrollbar>
      <Stack sx={{ p: 3, pr: 0 }}>
        <Stack sx={{ p: 3, pr: 0 }}>team xanh</Stack>
        <Stack sx={{ p: 3, pr: 0 }}>team do</Stack>
      </Stack>
    </Scrollbar> */}
    </Card>
  );
};

MatchDetail.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
};
