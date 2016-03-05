package feuyeux.io.netty.udp.cmd2.controller;

import feuyeux.io.netty.udp.cmd2.entity.CommandType;
import feuyeux.io.netty.udp.cmd2.info.ControlInfo;
import feuyeux.io.netty.udp.cmd2.info.KeyControlInfo;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 * Created by erichan on 2/10/14.
 */
public class MouseController implements CmdController {
    private static final Logger logger = LogManager.getLogger(MouseController.class);

    public MouseController() {

    }

    @Override
    public CommandType getType() {
        return CommandType.KEY;
    }

    @Override
    public void process(ControlInfo controlInfo) {
        KeyControlInfo keyControlInfo = (KeyControlInfo) controlInfo;
        logger.debug("Mouse is:{}", keyControlInfo.getKeyPress());
        //......
    }
}
