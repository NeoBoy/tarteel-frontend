import React, { Component } from 'react';
import styled from 'styled-components';
import T from '../../components/T';
import { BookOpen, Share2 } from 'react-feather';
import ShareModal from '../../components/ShareModal';
import Cookies from 'js-cookie';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  render() {
    const { ayah } = this.props;
    const locale = Cookies.get('currentLocale') || 'en';

    return (
      <Ayah key={this.props.i}>
        <div>
          <span className="surah-index">
            {ayah.surahNum}:{ayah.ayahNum}
          </span>
          <span className="surah-name-english">
            Surah {ayah.translationSurahName}
          </span>
          <span className="surah-name-arabic">
            {ayah.arabicSurahName}: آية {ayah.ayahNum.toLocaleString('ar-EG')}
          </span>
          <div className="ayah-content">
            <p className="arabic-ayah">{ayah.arabicAyah}</p>
            <p className="translation-text">{ayah.translationAyah}</p>
          </div>
          <div className="footer-links">
            <a
              href={`https://quran.com/${ayah.surahNum}/${ayah.ayahNum}`}
              target="_blank"
            >
              <BookOpen />
              Read on Quran.com
            </a>
            <a onClick={() => this.setState({ modalOpen: true })}>
              <Share2 />
              Share this Ayah
            </a>
          </div>
          <ShareModal
            show={this.state.modalOpen}
            quote={``}
            url={`https://tarteel.io/ayah/${ayah.surahNum}/${ayah.ayahNum}${
              locale === 'ar' ? '/?lang=ar' : ''
            }`}
            handleCloseModal={() => {
              this.setState({ modalOpen: false });
            }}
          />
        </div>
      </Ayah>
    );
  }
}

const Ayah = styled.div`
  margin: 20px;
  color: white;
  background-color: #33a4ab;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.11);

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}px) {
      margin-left: 5px;
      margin-right: 5px;
  }

  .ayah-content {
    margin-top: 20px;
    padding-left: 40px;
    padding-right: 40px;

    @media screen and (max-width: ${props => props.theme.breakpoints.sm}px) {
      padding-left: 10px;
      padding-right: 10px;
    }
  }

  .arabic-ayah {
    direction: rtl;
    text-align: right;
    font-size: 28px;
    margin-bottom: 20px;
  }

  hr {
    border: 1px #efefef solid;
    margin-top: 30px;
  }

  .surah-index {
  }

  .surah-name-english {
    padding-left: 5px;
  }
  .surah-name-arabic {
    float: right;
  }

  .translation-text {
    // font-size: 17px;
  }

  .footer-links {
    margin-top: 30px;
    margin-bottom: 10px;
    color: white;
    text-align: center; 

    a {
      color: white;
      margin-left: 20px;
      margin-right: 20px;
    
      &:hover {
        text-decoration: underline;
        cursor: pointer;        
      }

      @media screen and (max-width: ${props => props.theme.breakpoints.sm}px) {
      display: block;
      &:not(:last-child){
        margin-bottom: 10px;
      }
      }
    }

    svg {
      height: 18px;
      vertical-align: bottom;
      margin-right: 3px;
    }
  }
  
}`;

export default SearchResult;
