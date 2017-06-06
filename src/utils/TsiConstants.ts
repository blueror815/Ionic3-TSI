export class TsiConstants {
    public static  CUSTOMER_FOLDER_KEY = "CustomerFolder";
    public static  START_PIC_KEY = "StartPic";
    public static  FTP_USERNAME = "FTPUsername";
    public static  FTP_PASSWORD = "FTPPassword";
    public static  EMAIL_SERVER_KEY = "EmailServer";
    public static  EMAIL_PORT_KEY = "EmailPort";
    public static  EMAIL_USERNAME_KEY = "EmailUsername";
    public static  EMAIL_PASSWORD_KEY = "EmailPassword";
    public static  EMAIL_RECIPIENT_KEY = "EmailRecipient";
    public static  EMAIL_FROM_KEY = "EmailFrom";
    
    public static  EMAIL_INTERN_ECPENDITURES_KEY = "EmailExpenditures";
    public static  EMAIL_INTERN_KM_KEY = "EmailKm";
    
    public static  HTTP_VIDEO_QUICKTIME = "video/quicktime";
    public static  HTTP_IMAGE_PNG = "image/png";

    public static  PARSE_CONF_FILE_PRIORITY = 31;
    public static  CHECK_FTP_PRIORITY =30;
    public static  READ_LOCAL_FILETIMES_PRIORITY = 30;
    public static  READ_SERVER_FILETIMES_PRIORITY = 29;
    public static  DOWNLOAD_ALL_OUTDATED_FILES_PIORITY = 28;
    public static  DEFAULT_DOWNLOAD_PRIORITY = 27;
    public static  PARSE_CUSTOMER_PRIORITY = 26;
    public static  PARSE_CATEGORY_PRIORITY = 25;
    public static  PARSE_ARTICLE_PRIORITY = 24;
    public static  PARSE_ORDER_PRIORITY = 23;
    
    public static  PARSE_EXPENDITURE_SUGGESTION_PRIORITY = 22;
    public static  PARSE_EXPENDITURES_PRIORITY = 21;
    
    public static  PARSE_DEFAULT_PRIORITY = 7;

    public static  GET_LOCAL_IMAGE_COUNT_PRIORITY = 25;
    public static  DOWNLOAD_ALL_SREVER_IMAGES_PRIORITY = 24;
    public static  GET_ALL_CUSTOMER_FOLDERS_PRIORITY = 24;
    public static  WRITE_CONF_FILE_PRIORITY = 23;
    public static  AUTOMATIC_UPDATE_PRIORITY = 16;
    public static  AUTOMATIC_SAVE_PRIORITY = 30;
    public static  START_ALL_PARSE_TASKS_PRIORITY = 12;
    public static  WRITE_SHOPPING_CART_PRIORITY = 9;
    public static  READ_SHOPPING_CART_PRIORITY = 3;
    public static  READ_EXPENDITURES_PRIORITY = 3;
    public static  WRITE_EXPENDITURES_PRIORITY = 2;
    public static  WRITE_EXPENDITURES_SUGGESTION_PRIORITY = 2;
    public static  WRITE_LICENCE_NUMBE_PRIORITY = 2;
    public static  WRITE_LICENCE_NUMBER_SUGGESTION_PRIORITY = 2;
    public static  WRITE_EXCEL_FILE_PRIORITY = 2;
    public static  WRITE_ERN_CONF_FILE_PRIORITY = 2;
    public static  WRITE_SYNC_FILE_PRIORITY = 1;
    
    public static  GET_LAST_KNOWN_LOCATION_PRIORITY = 10;
    public static  ENABLE_LOCATION_LISTENER_PRIORITY = 9;
    public static  GET_ZIP_PRIORITY = 8;
    public static  DISABLE_LOCATION_LISTENER_PRIORITY = 0;
    
    public static  IMAGE_WRITE_PRIORITY = 7;
    public static  IMAGE_READ_HASHMAP_PRIORITY = 6;
    public static  IMAGE_READ_FILESYSTEM_PRIORITY = 5;
    public static  IMAGE_FROM_VIDEO_PRIORITY = 5;
    public static  IMAGE_SCALE_PRIORITY = 4;
    public static  IMAGE_DOWNLOAD_PRIORITY = 3;
    public static  EXTRA_KEY_LOCATION = "locKey";
    public static  EXTRA_KEY_FORCEREFRESH = "forceRefreshKey";
    public static  MIN_TIME = 30000;
}