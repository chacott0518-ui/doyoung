import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SmoothScroll from './components/SmoothScroll';
import Header from './components/Header';
import HeroLiquid from './components/HeroLiquid';
import Portfolio from './components/Portfolio'; // Represents DESIGNER section
import Footer from './components/Footer';
import { ANIMATION_EASE } from './types';

// --- SUB-COMPONENTS FOR MODULARITY ---

// 1. STYLE SECTION (Updated with 34 items & Mobile UX Optimization)
const styleGallery = [
  // 남성 섹션 (1-3번)
  { title: "댄디펌", category: "남성", desc: "차분하고 단정한 볼륨감", tags: ["#남성미디움", "#볼륨펌"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20180203_82%2F15176263942809yM6Q_JPEG%2FIdDXFS77ZTxfT405mw-puFq3.jpg" },
  { title: "남자 가르마 펌", category: "남성", desc: "부드러운 인상의 스타일", tags: ["#다운펌", "#가르마"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20180703_277%2F1530606282564V47TC_JPEG%2F1fYsSV5evXBUSqAqQ_JquP90.jpg" },
  { title: "남자 볼륨펌", category: "남성", desc: "풍성한 볼륨과 텍스처", tags: ["#투블럭", "#쉐도우펌"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20181126_104%2F1543212150499Ocr3X_JPEG%2FdFBnKwPRTDofHaMiYqehad5X.jpg" },

  // 롱 & 미디움 (4-22번)
  { title: "레이어드컷+빌드펌", category: "롱 & 미디움", desc: "C컬과 S컬의 조화", tags: ["#애쉬브라운", "#빌드펌"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20240508_138%2F1715150979417wqSSK_JPEG%2FKakaoTalk_20230310_182522920_03.jpg" },
  { title: "레이어드컷+S컬", category: "롱 & 미디움", desc: "우아하게 흐르는 웨이브", tags: ["#여성롱", "#레이어드펌"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20240508_146%2F1715150842826PG6zs_JPEG%2FKakaoTalk_20231016_155946507_01.jpg" },
  { title: "레이어드컷+매직", category: "롱 & 미디움", desc: "깔끔한 슬릭 라인", tags: ["#매직", "#슬릭컷"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20240508_236%2F1715150779091HXTCM_JPEG%2FKakaoTalk_20231016_155946507_02.jpg" },
  { title: "레이어드컷/CS빌드펌", category: "롱 & 미디움", desc: "볼륨감 있는 CS컬 디자인", tags: ["#CS컬", "#미디움펌"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20231228_8%2F17037319221742DwwH_JPEG%2FKakaoTalk_20231227_225026102.jpg" },
  { title: "레이어드 컷 (cs컬)", category: "롱 & 미디움", desc: "가벼운 질감의 레이어드", tags: ["#데일리", "#커트"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20231102_34%2F1698884770947m40CG_JPEG%2FKakaoTalk_20221113_150453673_04.jpg" },
  { title: "레이어드컷 슬릭펌", category: "롱 & 미디움", desc: "트렌디한 슬릭 텍스처", tags: ["#뿌리볼륨", "#슬릭펌"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20231102_161%2F16988847278191Nmyb_JPEG%2F%25BC%25D2%25BF%25AC.jpg" },
  { title: "레이어드컷/ c컬펌", category: "롱 & 미디움", desc: "단정하고 편한 손질", tags: ["#C컬펌", "#브라운"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20231102_122%2F1698884667881xJwRU_JPEG%2FKakaoTalk_20221204_150601998_01.jpg" },
  { title: "세팅펌, S컬펌", category: "롱 & 미디움", desc: "탱글한 탄력 웨이브", tags: ["#세팅펌", "#S컬"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20231102_293%2F1698884618461Lpiif_JPEG%2F%25BC%25BA%25C1%25D6.jpg" },
  { title: "긴머리 발롱펌", category: "롱 & 미디움", desc: "로맨틱한 굵은 웨이브", tags: ["#발롱펌", "#롱헤어"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230525_221%2F1684987695984dXcht_JPEG%2FKakaoTalk_20230525_115828899_%25281%2529.jpg" },
  { title: "매직세팅", category: "롱 & 미디움", desc: "곱슬은 펴고 끝은 웨이브", tags: ["#매직세팅", "#C컬"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230207_21%2F1675737521033ByWM7_JPEG%2FKakaoTalk_20230203_105920180.jpg" },
  { title: "레이어드컷", category: "롱 & 미디움", desc: "커트만으로 만드는 볼륨", tags: ["#여성컷", "#애쉬그레이"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230204_35%2F1675478939733DzTpO_JPEG%2FKakaoTalk_20230203_105609784.jpg" },
  { title: "굵은웨이브펌", category: "롱 & 미디움", desc: "자연스러운 여신 웨이브", tags: ["#여신웨이브", "#롱펌"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230204_125%2F1675478853024QdQjV_JPEG%2FKakaoTalk_20230203_105740844.jpg" },
  { title: "중간머리 S컬펌", category: "롱 & 미디움", desc: "어중간한 기장 해결", tags: ["#미디움S컬", "#다크브라운"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230203_264%2F1675385051493q4IAf_JPEG%2FKakaoTalk_20221113_150453673_04.jpg" },
  { title: "여신 레이어드 S컬펌", category: "롱 & 미디움", desc: "화려하고 풍성한 실루엣", tags: ["#초코브라운", "#여신머리"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230203_211%2F1675384959518SsgGQ_JPEG%2FKakaoTalk_20230202_181013274.jpg" },
  { title: "레이어드컷 (발롱펌)", category: "롱 & 미디움", desc: "생동감 넘치는 컬링", tags: ["#오렌지브라운", "#발롱펌"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200718_229%2F1595065898800glUN1_JPEG%2FK4TZjK0wFWfkF4evLJJTZwIZ.jpg" },
  { title: "바디펌 스타일", category: "롱 & 미디움", desc: "자연스러운 드라이 느낌", tags: ["#바디펌", "#미디움"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200718_5%2F1595065478049TCh96_JPEG%2FNwkrEDYVzDA05ohWW6t1SrJU.jpg" },
  { title: "긴머리 여신웨이브", category: "롱 & 미디움", desc: "청순한 무드의 롱 웨이브", tags: ["#롱웨이브", "#청순"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20181123_37%2F1542970529912OxdVA_PNG%2FENXFgMyaUQprQ6TucB10TLYw.png" },
  { title: "물결펌", category: "롱 & 미디움", desc: "유니크한 물결 스타일", tags: ["#물결펌", "#히피스타일"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20160913_101%2F1473732144935UjzBV_JPEG%2F75f9546f-dbd4-411b-9af0-6fc72fb7fa21.jpeg" },
  { title: "긴머리 웨이브펌", category: "롱 & 미디움", desc: "클래식한 롱 웨이브", tags: ["#웨이브펌", "#클래식"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20181118_276%2F1542535571246FSYL2_PNG%2Fkq1znGnF_CqzwzW8Kupya_Mw.png" },

  // 단발 & 컷 (23-27번)
  { title: "태슬컷 매직", category: "단발 & 컷", desc: "시크한 칼단발 라인", tags: ["#태슬컷", "#볼륨매직"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20180203_100%2F1517626512169JYwyz_JPEG%2F169_whnr52Opy9x1zHw4FTfP.jpg" },
  { title: "단발 볼륨펌", category: "단발 & 컷", desc: "상큼하고 발랄한 단발", tags: ["#단발펌", "#상큼"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20181126_42%2F1543212042156QWgRw_JPEG%2FCjJinmbqElTDjerrh4Ipa-yU.jpg" },
  { title: "보브단발", category: "단발 & 컷", desc: "세련된 도시적 이미지", tags: ["#보브컷", "#세련"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200718_167%2F1595065774562tP076_JPEG%2F4qMsUdxOE3tu1GAIDfmku9ZC.jpg" },
  { title: "단발 C컬펌", category: "단발 & 컷", desc: "단정한 안말음 컬", tags: ["#단발C컬", "#밀크브라운"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20181118_210%2F1542537525605m7STK_PNG%2Fq0ISpetnoS3FGiwgaZH9bXPP.png" },
  { title: "여성 볼륨 C컬펌", category: "단발 & 컷", desc: "볼륨을 살린 페미닌 단발", tags: ["#볼륨C컬", "#여성단발"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190218_21%2F1550469259122R3p9b_PNG%2FoDbN1HbS4fupei_U6XjMWLbt.png" },

  // 컬러 (28-34번)
  { title: "레이어드 컷 투톤", category: "컬러", desc: "개성있는 투톤 디자인", tags: ["#투톤", "#포인트"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190218_107%2F15504698914266aCNJ_PNG%2FMgCjBAwVvSAMfclPymdqlIdV.png" },
  { title: "애쉬브라운 컬러", category: "컬러", desc: "부드럽고 신비로운 색감", tags: ["#애쉬브라운", "#염색추천"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20181126_101%2F1543211932888FCqK9_JPEG%2FJZMSWx5Zmf_htAbz-vbI2hgy.jpg" },
  { title: "블루블랙 컬러", category: "컬러", desc: "시크하고 차가운 블랙", tags: ["#블루블랙", "#시크"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190218_69%2F1550469577488ywk16_JPEG%2FHLCidN3nU59mKSJ2CKgk7MDF.jpg" },
  { title: "애쉬그레이 빌드펌", category: "컬러", desc: "오묘한 그레이 조화", tags: ["#탈색", "#빌드펌"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20180915_284%2F153697954173551r1O_JPEG%2Fho36hfjbQJuLF3dAJvvJa8pr.jpg" },
  { title: "카키브라운 C컬", category: "컬러", desc: "매트한 브라운 컬러", tags: ["#카키브라운", "#C컬"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20181126_250%2F1543213519114RsQwH_JPEG%2F2oBNOO-yn_zN57w3vB4JDfKu.jpg" },
  { title: "애쉬퍼플 옴브레", category: "컬러", desc: "몽환적인 그라데이션", tags: ["#옴브레", "#애쉬퍼플"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20180203_240%2F1517626595138hDMpM_JPEG%2FSQg4_-S3lmTtzdiowIyyZyos.jpg" },
  { title: "로즈핑크 컬러", category: "컬러", desc: "생기 넘치는 로즈 컬러", tags: ["#로즈핑크", "#탈색"], image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20181126_34%2F1543212385585jDMgi_JPEG%2FqmNnmn9xRWp_iq-Kk5bFiTKI.jpg" },
];

const StyleSection = () => {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [displayCount, setDisplayCount] = useState(8);
  const categories = ["전체", "롱 & 미디움", "단발 & 컷", "남성", "컬러"];

  // Filter Logic
  const filteredStyles = useMemo(() => {
    if (activeCategory === "전체") return styleGallery;
    return styleGallery.filter(style => style.category === activeCategory);
  }, [activeCategory]);

  // Visible Items Logic
  const visibleStyles = useMemo(() => {
    return filteredStyles.slice(0, displayCount);
  }, [filteredStyles, displayCount]);

  // Handlers
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setDisplayCount(8); // Reset to 8
  };

  const handleShowMore = () => {
    setDisplayCount((prev) => prev + 8);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ANIMATION_EASE } }
  };

  return (
    <section id="style" className="min-h-screen py-16 md:py-32 px-6 md:px-16 max-w-[1800px] mx-auto relative">

      {/* Title Header */}
      <div className="mb-12 md:mb-16 text-center md:text-left">
        <span className="text-brand-purple text-xs font-bold tracking-[0.2em] uppercase mb-3 block">Lookbook</span>
        <h2 className="text-4xl md:text-6xl font-light text-white">Trending Styles</h2>
      </div>

      {/* Sticky Category Navigation */}
      {/* Category Navigation - 투명 버전 */}
      <div className="relative z-30 mb-12 py-4 bg-transparent">
        <div className="flex overflow-x-auto no-scrollbar gap-2 md:gap-3 justify-start md:flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`whitespace-nowrap text-xs md:text-sm px-5 py-2.5 rounded-full border transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-white text-black border-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/40 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        key={activeCategory} // Force re-render/animate on category change
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {visibleStyles.map((style, idx) => (
            <motion.div
              layout
              variants={itemVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, scale: 0.9 }}
              key={`${style.title}-${idx}`}
              className="group cursor-pointer w-full"
            >
              {/* Aspect Ratio 4:5 */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-zinc-900">
                <motion.img
                  src={style.image}
                  alt={style.title}
                  className="w-full h-full object-cover transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />

                {/* Text Content */}
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-5 flex flex-col justify-end">
                  <h3 className="text-white text-sm md:text-lg font-semibold leading-tight mb-1 transition-colors duration-300 group-hover:text-[#A855F7] drop-shadow-md">
                    {style.title}
                  </h3>
                  <span className="text-[10px] md:text-xs text-white/80 font-light tracking-wider">
                    {style.tags[0]}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Show More Button */}
      {displayCount < filteredStyles.length && (
        <div className="mt-16 flex justify-center">
          <button
            onClick={handleShowMore}
            className="group relative px-10 py-4 rounded-full border border-white/10 bg-white/5 text-white text-sm uppercase tracking-widest overflow-hidden hover:bg-white hover:text-black transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2 font-medium">
              스타일 더보기 <span className="text-lg leading-none">+</span>
            </span>
          </button>
        </div>
      )}

    </section>
  );
};

// 2. PRICE SECTION (Updated Layout based on new Data)
const PriceSection = () => {
  const priceItems = [
    { category: "컷", name: "첫방문 컷", price: "22,000", badge: "대표" },
    { category: "일반펌", name: "첫방문 일반 펌", price: "84,000", badge: "대표" },
    { category: "열펌", name: "첫방문 열펌", price: "126,000", badge: "대표" },
    { category: "염색", name: "첫방문 염색", price: "63,000", badge: "대표" },
  ];

  return (
    <section id="price" className="py-16 md:py-32 px-8 md:px-16 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1000px] mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-24">
          <span className="text-brand-purple text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Service Menu</span>
          <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight">Price List</h2>
        </div>

        <div className="flex flex-col space-y-2">
          {priceItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              // Using Grid to enforce strictly equal column widths on mobile
              // grid-cols-[4.5rem_1fr_auto]: First col is exactly 4.5rem (approx 72px)
              className="group relative grid grid-cols-[4.5rem_1fr_auto] md:grid-cols-[6rem_1fr_auto] items-center gap-2 md:gap-4 py-5 md:py-6 border-b border-white/10 hover:border-brand-purple/50 transition-colors duration-300"
            >
              {/* Col 1: Category - Strict Left Alignment */}
              <div className="text-white font-medium text-base md:text-xl text-left truncate">
                {item.category}
              </div>

              {/* Col 2: Name & Badge - Flex for internal spacing */}
              <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                <span className="text-gray-400 font-light text-sm md:text-base whitespace-nowrap">
                  {item.name}
                </span>
                {item.badge && (
                  <span className="shrink-0 px-1.5 py-[1px] md:px-2 md:py-[2px] rounded-full bg-white/10 border border-white/20 text-[9px] md:text-[10px] text-white/80">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Col 3: Price - Right Aligned */}
              <div className="text-right">
                <span className="text-lg md:text-2xl font-light text-white group-hover:text-brand-purple transition-colors duration-300">
                  {item.price}원
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-12 text-center md:text-right space-y-2"
        >
          <p className="text-gray-400 text-sm md:text-base font-light">
            <span className="text-white/30 mr-2">추가 요금</span>
            어깨아래 <span className="text-white font-medium">30,000원</span> &middot;
            가슴아래 <span className="text-white font-medium">50,000원</span>
          </p>
          <p className="text-gray-600 text-xs font-light">
            * 가격정보는 시술별 기본가격을 기준으로 제공합니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// 3. REVIEW SECTION (Responsive: Infinite Marquee on Desktop, Scroll Snap on Mobile)
const ReviewSection = () => {
  // Mobile Detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const clientReviews = [
    { id: 1, name: "seo****", content: "뿌리가 많이 자라있었는데... 사진 백만장 찍었어요!", image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20240508_138%2F1715150979417wqSSK_JPEG%2FKakaoTalk_20230310_182522920_03.jpg" },
    { id: 2, name: "네이버안녕", content: "친절하시기도 하고 손질법도 잘 알려주시더라구요.", image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20240508_146%2F1715150842826PG6zs_JPEG%2FKakaoTalk_20231016_155946507_01.jpg" },
    { id: 3, name: "gyeongx", content: "머리 손상이 많은데도 컬 잘 나오게 해주셨어요 ♥", image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20231102_34%2F1698884770947m40CG_JPEG%2FKakaoTalk_20221113_150453673_04.jpg" },
    { id: 4, name: "tjs****", content: "얼룩이 많이 있는 상태였는데 자연스럽게 이어지도록...", image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20231102_161%2F16988847278191Nmyb_JPEG%2F%25BC%25D2%25BF%25AC.jpg" },
    { id: 5, name: "김동하394", content: "스타일 추천도 잘해주시고! 조용히 잘해주시네요.", image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230204_35%2F1675478939733DzTpO_JPEG%2FKakaoTalk_20230203_105609784.jpg" },
    { id: 6, name: "별8636", content: "허쉬컷으로 자르고 쌤이 드라이까지 이쁘게 해주셨어요.", image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20180203_100%2F1517626512169JYwyz_JPEG%2F169_whnr52Opy9x1zHw4FTfP.jpg" },
    { id: 7, name: "김동하394", content: "맘에드네요", image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20181126_101%2F1543211932888FCqK9_JPEG%2FJZMSWx5Zmf_htAbz-vbI2hgy.jpg" },
  ];

  // For desktop: Double the array for seamless infinite loop
  // For mobile: Use single array for clean scroll without duplication
  const displayItems = isMobile ? clientReviews : [...clientReviews, ...clientReviews];

  return (
    <section id="reviews" className="py-16 bg-black overflow-hidden border-t border-white/10">
      <div className="mb-12 md:mb-16 text-center px-4">
        <span className="text-xs font-bold text-brand-purple uppercase tracking-[0.3em] inline-block mb-2">Client Love</span>
      </div>

      {/* Marquee/Slider Container */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          // Force re-render when switching modes to clear animation state
          key={isMobile ? "mobile-slider" : "desktop-marquee"}
          className={`flex gap-4 md:gap-8 px-4 ${isMobile
            ? 'overflow-x-auto snap-x snap-mandatory w-full no-scrollbar'
            : 'w-max' // Desktop needs w-max for animation to work on long content
            }`}
          // Desktop Animation: Infinite Left Scroll
          animate={!isMobile ? { x: ["0%", "-50%"] } : undefined}
          transition={!isMobile ? {
            repeat: Infinity,
            ease: "linear",
            duration: 30,
          } : undefined}
          style={isMobile ? { x: 0 } : undefined} // Ensure no residual transform on mobile
        >
          {displayItems.map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              // Mobile: 66vw (1.5 items visible), Snap center
              // Desktop: 28vw (3.5 items visible)
              className={`flex-shrink-0 relative rounded-2xl overflow-hidden group cursor-pointer w-[66vw] md:w-[28vw] aspect-[3/4] ${isMobile ? 'snap-center' : ''
                }`}
            >
              {/* Image with Grayscale Effect */}
              <img
                src={review.image}
                alt={review.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h4 className="text-white font-bold text-base md:text-lg mb-1 drop-shadow-md">
                  {review.name}
                </h4>
                <p className="text-purple-300 text-xs md:text-sm font-light leading-relaxed line-clamp-2 drop-shadow-sm">
                  "{review.content}"
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// 4. BOOKING SECTION (High Impact CTA Only)
const BookingSection = () => {
  return (
    <section id="booking" className="min-h-screen flex flex-col items-center justify-center px-8 bg-black border-t border-white/10 py-20 md:py-48 relative overflow-hidden">

      {/* 1. Purple Glow Effect (Maintained) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl">
        {/* 2. Title (Preserved) */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: ANIMATION_EASE }}
          className="text-6xl md:text-8xl font-bold text-center text-white mb-12 tracking-tighter"
        >
          READY FOR<br />CHANGE?
        </motion.h2>

        {/* 3. Button (Preserved) */}
        <motion.a
          href="https://map.naver.com/p/entry/place/37450128?placePath=/stylist&fromPanelNum=1&additionalHeight=76&timestamp=202601281517&locale=ko&svcName=map_pcv5&from=map&c=15.00,0,0,0,dh"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-5 bg-white text-black text-lg font-bold rounded-full uppercase tracking-widest hover:bg-brand-purple hover:text-white transition-all duration-300 inline-block text-center shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          Book Your Session
        </motion.a>

        {/* 4. Subtext */}
        <p className="mt-8 text-gray-500 text-sm tracking-wide">
          Online booking available 24/7
        </p>

        {/* Removed integrated contact info block to restore pure CTA focus */}
      </div>
    </section>
  );
};

// --- MAIN APP COMPONENT ---

function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen w-full bg-black text-white selection:bg-white selection:text-black">
        <Header />

        <main className="relative z-10">
          <HeroLiquid />

          {/* ABOUT SECTION - PC 레이아웃 최적화 및 이미지 추가 */}
          <section id="about" className="py-16 md:py-32 px-8 md:px-16 max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center w-full">

              {/* 왼쪽: 브랜드 이미지 (섹션의 볼륨감을 잡아줌) */}
              <div className="w-full md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl group" // Added 'group'
                >
                  <img
                    src="https://i.pinimg.com/736x/4a/ab/1c/4aab1c0f02815ea1ca8805216e6d6d03.jpg"
                    alt="Stylist Studio Interior"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out" // Changed to group-hover
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" /> // Added pointer-events-none
                </motion.div>
              </div>

              {/* 오른쪽: 텍스트 설명 */}
              <div className="w-full md:w-1/2">
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-brand-purple mb-6 block">Who We Are</span>
                <h2 className="text-5xl md:text-7xl font-light text-white leading-[1.1] mb-10">
                  Redefining<br />Identity.
                </h2>
                <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-xl">
                  우리는 스타일이 곧 당신의 정체성이라고 믿습니다. <br /><br />
                  단순한 유행을 따르기보다 당신만의 고유한 분위기를 발견하고,
                  세밀한 기술과 예술적 감각을 결합하여 가장 빛나는 순간을 설계합니다.
                </p>
              </div>

            </div>
          </section>

          {/* DESIGNER SECTION (Formerly Portfolio) */}
          <Portfolio />

          {/* STYLE SECTION (Updated) */}
          <StyleSection />

          {/* PRICE SECTION (New Layout) */}
          <PriceSection />

          {/* REVIEW SECTION */}
          <ReviewSection />

          {/* BOOKING SECTION */}
          <BookingSection />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;