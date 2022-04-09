import styled from "styled-components";

export const TableContainer = styled.div`
  width: min(100% - 2rem, 1440px);
  margin-inline: auto;

  table {
    width: min(100% - 2rem);
    border-spacing: 0;
    border: none;
    margin-inline: auto;
    font-family: Rubik, sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0.03em;
    text-align: center;
    background-color: #ffffff;
    
    th, td {
      height: 34px; 
    }

    td {
      font-family: Rubik, sans-serif;
      font-size: 14px;
      font-weight: 400;
      line-height: 17px;
      letter-spacing: 0.03em;
      text-align: right;
      align-items: center;
      background-color: #f6f6f6;
      border: 1.5px solid #ffffff;
    }
  }

  .td-move {
    width: 50px;
  }

  .div-icons {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    color: #909090;
  }

  .div-icon {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  .item-id, .div-icon {
    text-align: center;
  }

  .div-green {
    border-radius: 7px;
    background-color: #27D96E;
    width: 14px;
    height: 14px;
    margin: 0 22px;
  }

  .div-yellow {
    border-radius: 7px;
    background-color: #F1A953;
    width: 14px;
    height: 14px;
    margin: 0 22px;
  }

  .td-row-icons0 {
    width: 100px;
  }

  .td-row-icons6 {
    width: 50px;
    border-left: none;
  }

  @media
	  only screen 
    and (max-width: 760px), (min-device-width: 768px) 
    and (max-device-width: 768px)  {

		/* Force table to not be like tables anymore */
		table, thead, tbody, th, tr {
			display: block;
		}

    td {
			/* Behave  like a "row" */
      width: 100%;
			position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
		}

    thead tr {
			position: absolute;
			top: -9999px;
			left: -9999px;
		}

    tr {
      margin: 0 0 2rem 0;
      border-top: 1px black dashed;
    }

    .td-move {
      width: 100%;
      border: 0;
      margin: 0 0 2px 0;
  }

    .item-id {
    width: 50%;
    margin: 2px 0 2px 0;
    border: 0;
    padding-left: 50%;
  }

  .td-row-icons0, .td-row-icons6, .div-icons {
    width: 100%;
    border: 0;
  }

  .td-row-icons6 {
    margin: 0 0 2px 0;
  }
  
  .td-row-icons5 {
    width: 50%;
    border: 0;
    margin: 0 0 2px 0;
    padding-left: 50%;
  }

  .div-icons { 
    display: flex;
    justify-content: right;
    margin: 2px 0 2px 0;
  }

  .div-icon { 
    width: 40px;
  }

    td:before {
			/* Now like a table header */
			position: absolute;
			/* Top/left values mimic padding */
			top: 0;
			left: 6px;
			width: 50%;
			padding-right: 10px;
			white-space: nowrap;
      display: flex;
      align-items: center;
      justify-content: center;
		}

    td:nth-of-type(2):before { content: 'אפשרויות';}
    td:nth-of-type(3):before { content: 'סך הכל שעות'; }
    td:nth-of-type(4):before { content: 'שעות'; }
    td:nth-of-type(5):before { content: 'שעות ידניות'; }
    td:nth-of-type(6):before { content: 'שעות חריגות'; }
    td:nth-of-type(7):before { content: 'שם עובד'; }
    td:nth-of-type(9):before { content: 'מספר ת.ז.'; }

  }


`;
