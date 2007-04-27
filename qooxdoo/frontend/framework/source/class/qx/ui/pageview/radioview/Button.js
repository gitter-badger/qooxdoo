/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2007 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Derrell Lipman (derrell)

************************************************************************ */

/* ************************************************************************

#module(ui_radioview)

************************************************************************ */

/**
 * @appearance button-view-button
 * @state checked Set by {@link #checked}
 * @state over
 */
qx.Class.define("qx.ui.pageview.radioview.Button",
{
  extend : qx.ui.pageview.AbstractButton,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(vText, vIcon, vIconWidth, vIconHeight, vFlash)
  {
    this.base(arguments, vText, vIcon, vIconWidth, vIconHeight, vFlash);

    // Initially, the icon is in its unselected state
    var oIcon = this.getIconObject();
    if (oIcon)
    {
      this.getIconObject().setOpacity(0.3);
    }
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    allowStretchX :
    {
      refine : true,
      init : true
    },

    allowStretchY :
    {
      refine : true,
      init : true
    },

    appearance :
    {
      refine : true,
      init : "radio-view-button"
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      EVENT HANDLER
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @type member
     * @param e {Event} TODOC
     * @return {void}
     */
    _onkeypress : function(e)
    {
      switch(e.getKeyIdentifier())
      {
      case "Up":
        var vPrevious = true;
        break;

      case "Down":
        var vPrevious = false;
        break;

      default:
        return;
      }

      if (vPrevious)
      {
        // Find the previous child which is a subclass of AbstractButton
        vChild = this;
        do
        {
          // If we're at the first child, ...
          if (vChild.isFirstChild())
          {
            // ... then we have nothing to do.
            return;
          }

          // Move to the previous item
          vChild = vChild.getPreviousSibling();

          // Ensure that it's a button.  If not, loop again.
        } while (! (vChild instanceof qx.ui.pageview.AbstractButton));
      }
      else
      {
        // Find the next child which is a subclass of AbstractButton
        vChild = this;
        do
        {
          // If we're at the last child, ...
          if (vChild.isLastChild())
          {
            // ... then we have nothing to do.
            return;
          }

          // Move to the next item
          vChild = vChild.getNextSibling();

          // Ensure that it's a button.  If not, loop again.
        } while (! (vChild instanceof qx.ui.pageview.AbstractButton));
      }

      // focus next/previous button
      vChild.setFocused(true);

      // and naturally also check it
      vChild.setChecked(true);
    },


    /*
    ---------------------------------------------------------------------------
      MODIFIER
    ---------------------------------------------------------------------------
     */

    /**
     * TODOC
     *
     * @type member
     * @param propValue {var} Current value
     * @param propOldValue {var} Previous value
     * @param propData {var} Property configuration map
     * @return {Boolean} TODOC
     */
    _modifyChecked : function(propValue, propOldValue, propData)
    {
      this.base(arguments, propValue, propOldValue, propData);

      // Show the icon only for the checked item
      var oIcon = this.getIconObject();
      if (oIcon)
      {
        oIcon.setOpacity(propValue ? 1.0 : 0.3);
      }

      return true;
    }
  }
});
