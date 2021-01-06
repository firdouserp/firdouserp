import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const generateStaticMarkup = (tooltipData) => {
  const computedClass = tooltipData.active
    ? "tooltip__highlight"
    : "tooltip__grey";


  return renderToStaticMarkup(
    <div className={`invoice-box`}>
      <table cellpadding="0" cellspacing="0"></table>
      <tbody>
        <tr className="top">
          <td colspan="2">
              
          </td>
        </tr>
        </tr></tr>
      </tbody>

      <div className="icon">{tooltipData.text}</div>
      {tooltipData.secondaryText && <div>{tooltipData.secondaryText}</div>}
      {tooltipData.users.map((user) => (
        <span>{user.name}</span>
      ))}
    </div>
  );
};
