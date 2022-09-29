// TODO: many of these are probably redundant and should be removed.
/**
 * Helper function to allow adding content types because XSS bad.
 * Hopefully this works as it should.
 * @param extension File extension, without any additional faff
 * @returns Content type that should be used
 */
export default function ContentType(extension: string): string {
  switch (
    extension?.toLowerCase()?.replace("jpg", "jpeg")?.replace("svg", "svg+xml")
  ) {
    case "aces":
    case "avci":
    case "avcs":
    case "avif":
    case "bmp":
    case "cgm":
    case "dpx":
    case "emf":
    case "fits":
    case "g3fax":
    case "gif":
    case "heic":
    case "heif":
    case "hej2k":
    case "hsj2":
    case "ief":
    case "jls":
    case "jp2":
    case "jpeg":
    case "jph":
    case "jphc":
    case "jpm":
    case "jpx":
    case "jxr":
    case "jxra":
    case "jxrs":
    case "jxs":
    case "jxsc":
    case "jxsi":
    case "jxss":
    case "ktx":
    case "ktx2":
    case "naplps":
    case "png":
    case "prs.btif":
    case "prs.pti":
    case "pwg-raster":
    case "t38":
    case "tiff":
    case "tiff-fx":
    case "wmf":
      return `image/${extension}`;

    case "1d-interleaved-parityfec":
    case "3gpp":
    case "3gpp2":
    case "3gpp-tt":
    case "av1":
    case "bmpeg":
    case "bt656":
    case "celb":
    case "dv":
    case "encaprtp":
    case "ffv1":
    case "flexfec":
    case "h261":
    case "h263":
    case "h263-1998":
    case "h263-2000":
    case "h264":
    case "h264-rcdo":
    case "h264-svc":
    case "h265":
    case "iso.segment":
    case "jxsv":
    case "mj2":
    case "mp1s":
    case "mp2p":
    case "mp2t":
    case "mp4":
    case "mp4v-es":
    case "mpv":
    case "mpeg":
    case "mpeg4-generic":
    case "nv":
    case "ogg":
    case "parityfec":
    case "pointer":
    case "quicktime":
    case "raptorfec":
    case "raw":
    case "rtp-enc-aescm128":
    case "rtploopback":
    case "rtx":
    case "scip":
    case "smpte291":
    case "smpte292m":
    case "ulpfec":
    case "vc1":
    case "vc2":
    case "vp8":
    case "vp9":
      return `video/${extension}`;
    default:
      return "";
  }
}
