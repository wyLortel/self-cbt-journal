//아마 이건 env가져오는거
import 'dotenv/config';
//hono가져오는거
import { Hono } from 'hono';
// CORS 미들웨어
import { cors } from 'hono/cors';
//아마 라우터 인듯 ?
import authRouter from './routes/auth';

const app = new Hono();

//내 API 서버의 모든 경로에 CORS를 적용하고,
//어떤 웹사이트에서 내 API를 호출하든,
//브라우저가 그 응답 데이터를 JavaScript 코드에게 보여주도록 허락한다
app.use('*', cors());

///auth로 시작하는 요청들은 authRouter한테 맡긴다
app.route('/auth', authRouter);

//c는 Hono의 Context입니다. 이번 요청과 응답을 다룰 수 있는 도구상자
//c 안에는 이런 느낌의 정보와 기능이 들어있습니다
// 요청 정보 보기
// 응답 만들기
// JSON 응답 보내기
// 쿼리 파라미터 읽기
// URL 파라미터 읽기
// 헤더 읽기
app.get('/', (c) => {
  return c.json({ success: true, data: { message: 'Self Mental API' } });
});

//포트번호 연결하는거겟고
const PORT = process.env.PORT || 3000;

export default {
  port: PORT,
  fetch: app.fetch,
};
