import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {MenuItem, Select} from "@material-ui/core"

const SettingsModal = (props) => {

    const {open, doCloseModal, setFormat} = props
    const [selectedFormat, setSelectedFormat] = useState('imperial')

    useEffect(() => {
        setFormat(selectedFormat)
        console.log(selectedFormat)
    }, [selectedFormat])

    const useStyles = makeStyles((theme) => ({
        modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        paper: {
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
    }));
      
    const classes = useStyles();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={doCloseModal}
            className={classes.modal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">settings</h2>
                    <Select
                // labelId="demo-simple-select-filled-label"
                id="demo-simple-select-outlined"
                label="Data format"
                value={selectedFormat}
                onChange={(event) => setFormat(event.target.value)}
                // onChange={(event) => setSelectedFormat(event.target.value)}
                displayEmpty
              >
                <MenuItem value={"metric"} default >Metric</MenuItem>
                <MenuItem value={"imperial"}>Imperial</MenuItem>
              </Select>
                </div>
            </Fade>
        </Modal>
    )
};

export default SettingsModal;