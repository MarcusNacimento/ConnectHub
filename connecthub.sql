--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ideas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ideas (
    id integer NOT NULL,
    title character varying(150) NOT NULL,
    description text,
    user_id integer,
    created_at timestamp without time zone DEFAULT now(),
    likes integer DEFAULT 0,
    favorited_by integer[] DEFAULT '{}'::integer[]
);


ALTER TABLE public.ideas OWNER TO postgres;

--
-- Name: ideas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ideas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ideas_id_seq OWNER TO postgres;

--
-- Name: ideas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ideas_id_seq OWNED BY public.ideas.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: ideas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ideas ALTER COLUMN id SET DEFAULT nextval('public.ideas_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: ideas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ideas (id, title, description, user_id, created_at, likes, favorited_by) FROM stdin;
6	Teste de titulo	teste de texto	7	2025-03-16 23:54:32.398951	0	{}
1	teste	testestsetset	5	2025-03-16 14:55:36.608209	0	{}
3	Testando	diahuyhdgauyklgdyukagyudkgaukytdgkuaytgda	8	2025-03-16 21:14:17.670857	0	{}
2	Ideia teste 2	testeando a ideia para ver se fucniona noramlmente	5	2025-03-16 15:22:39.121645	1	{7}
7	titulo 2	text 2	7	2025-03-18 21:23:50.631282	1	{7,1}
8	testando erros	5	1	2025-03-18 21:28:59.34587	0	{}
5	Inter campeão libertadores 2025	inter chegará na final da libertadores 2025 e perderá de 4 a 0 no jogo de ida contra o riverplate, no joga da volta fará o maior resultado já feito em uma libertadores, a maior virada de todos os tempos: 6 a 1 inter	9	2025-03-16 21:52:39.827722	3	{7,10}
12	Titulos grêmio 2025	Série B 2026	7	2025-03-25 22:10:22.087316	0	{}
11	Ir atrás de minas	ser gado para sempre e depender de uma menina	11	2025-03-25 22:07:12.898893	1	{11,12}
9	teste	Nfafafafaf	10	2025-03-21 22:52:38.656486	2	{10,12}
4	dadada	dadadada	8	2025-03-16 21:17:56.864982	0	{}
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, created_at) FROM stdin;
1	marcus	marcus@teste	$2b$10$Nsv.YQk11/yIbsb4pGu7a.UC9VJ9HVK/0HggTMUbwzJ86CeKJ.hyC	2025-03-16 14:39:08.340294
2	marcus	marcus@f	$2b$10$tcThu9duYcOSEuZz7bK4buOdjEuoWaFgVjwopGaplEW91waVypATi	2025-03-16 14:39:26.035119
3	teste	teste@gmail.com	$2b$10$0nggDwqPJKdXGOyP2VoMbuxlCCIxcJqRfah271hUtHJ9ZNYEI2VYa	2025-03-16 14:40:59.511784
4	teste2	teste2@gmail.com	$2b$10$D1DG0xXaqrtASKrXC1BKmeMFHPPz2fF61hadgrYTn9xKlpoQJHGwq	2025-03-16 14:42:56.655575
5	teste	teste3@gmail.com	$2b$10$ePW.Id4phVUBqwTtSElOtOBv9VHRIg.TPsuI5eStb.9I5QNJODUWa	2025-03-16 14:45:28.086475
7	MV	marcusvinicius2090@gmail.com	$2b$10$fHDBGgCgu7C/lUOjXdSkAexkNei4pU9Ooc2uqWAs2M.3tZZ28o4x.	2025-03-16 15:40:19.42473
8	abc	abc@gmail.com	$2b$10$FgG.tc3V3hxQ.iJo7OZejefimfebiF87hTxqGszoxLLILd10i1EXW	2025-03-16 20:43:53.700489
9	inter	inter@gmail.com	$2b$10$SjcEtTNcbMkRwxMYtKcZWuVMXaTpCoSvoUGThs3fqxNLj2SL0bdle	2025-03-16 21:50:53.814358
10	Dudu	dudu@dudu.com	$2b$10$yk.x8.zPsovK5SUwWBm3UOpfzRMpZD37VREDfRgCRcWMaEKG9f7Pa	2025-03-21 22:44:50.757417
11	MICHEL	michel@gmail.com	$2b$10$886BOUj6Z7W8lbFDuRj0EulONOw9QKNR3dT76coShKjXfUcHZqPP.	2025-03-25 22:05:39.251763
12	SB	testesembanco@gmail.com	$2b$10$wIwzqGbDxvU4iVKEzAd98eb2ifgkOtnA2i6BBtvG7Z6Ovk5Bh86S2	2025-03-27 10:33:49.095632
\.


--
-- Name: ideas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ideas_id_seq', 12, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 12, true);


--
-- Name: ideas ideas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ideas
    ADD CONSTRAINT ideas_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ideas ideas_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ideas
    ADD CONSTRAINT ideas_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

