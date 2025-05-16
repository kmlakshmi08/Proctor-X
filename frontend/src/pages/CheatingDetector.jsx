// CheatingDetector.js
import { useEffect, useRef } from "react";

const DEFAULT_THRESHOLDS = {
  bannedObjectFrames:    1,   // immediate
  multipleFacesFrames:   3,   // e.g. 3×2s = 6 seconds
  noFaceFrames:          5,   // 5×2s = 10 seconds
  faceMismatchFrames:    1,   // immediate
  eyesMissingFrames:     5,   // e.g. looking away 10 seconds
  gazeAwayFrames:        5,   // same
  headPoseExtremeFrames: 5,   // same
  mouthOpenFrames:       5    // same
};

/**
 * @param {object} props
 * @param {object} props.detectionData  – the full object you posted above
 * @param {function} props.onCheatingDetected – called once when we decide to end
 */
export default function CheatingDetector({
  detectionData,
  onCheatingDetected,
  thresholds = DEFAULT_THRESHOLDS
}) {
  // refs to keep counters across renders
  const counters = useRef({
    bannedObject:    0,
    multipleFaces:   0,
    noFace:          0,
    faceMismatch:    0,
    eyesMissing:     0,
    gazeAway:        0,
    headPoseExtreme: 0,
    mouthOpen:       0
  });

  useEffect(() => {
    const d = detectionData;
    const c = counters.current;

    // 1) BANNED OBJECT
    if (d.banned_objects_detected) {
      c.bannedObject += 1;
    } else {
      c.bannedObject = 0;
    }

    // 2) MULTIPLE FACES
    if (d.num_faces > 1) {
      c.multipleFaces += 1;
    } else {
      c.multipleFaces = 0;
    }

    // 3) NO FACE AT ALL
    if (!d.face_detected) {
      c.noFace += 1;
    } else {
      c.noFace = 0;
    }

    // 4) FACE MISMATCH (imposter)
    if (d.face_detected && !d.face_match) {
      c.faceMismatch += 1;
    } else {
      c.faceMismatch = 0;
    }

    // 5) EYES MISSING
    if (!d.eye_detected) {
      c.eyesMissing += 1;
    } else {
      c.eyesMissing = 0;
    }

    // 6) GAZE AWAY (anything other than “forward” / “center”)
    if (d.gaze_direction && d.gaze_direction !== "forward" && d.gaze_direction !== "center") {
      c.gazeAway += 1;
    } else {
      c.gazeAway = 0;
    }

    // 7) HEAD POSE EXTREME (you might encode pose like “pitch:30,yaw:45” etc.)
    //    Here we assume head_pose is a string like “yaw:45,pitch:10” and you parse yaw > 30° as extreme.
    const extreme = (() => {
      if (!d.head_pose) return false;
      const match = /yaw:(-?\d+),?/.exec(d.head_pose);
      if (!match) return false;
      const yaw = Math.abs(parseInt(match[1], 10));
      return yaw > 30; 
    })();
    if (extreme) {
      c.headPoseExtreme += 1;
    } else {
      c.headPoseExtreme = 0;
    }

    // 8) MOUTH OPEN (speaking to someone off‑camera)
    if (d.mouth_open) {
      c.mouthOpen += 1;
    } else {
      c.mouthOpen = 0;
    }

    // Finally: did *any* counter exceed its threshold?
    const violation =
      c.bannedObject    >= thresholds.bannedObjectFrames    ||
      c.multipleFaces   >= thresholds.multipleFacesFrames   ||
      c.noFace          >= thresholds.noFaceFrames          ||
      c.faceMismatch    >= thresholds.faceMismatchFrames    ||
      c.eyesMissing     >= thresholds.eyesMissingFrames     ||
      c.gazeAway        >= thresholds.gazeAwayFrames        ||
      c.headPoseExtreme >= thresholds.headPoseExtremeFrames ||
      c.mouthOpen       >= thresholds.mouthOpenFrames;

    if (violation) {
      onCheatingDetected();
    }
  }, [detectionData, onCheatingDetected, thresholds]);

  return null;
}
